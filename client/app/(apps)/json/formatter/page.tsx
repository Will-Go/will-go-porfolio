"use client";

import { useMemo, useState } from "react";
import Card from "@/components/Card";
import CopyText from "@/components/CopyText";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

const lineNumberClass =
  "pr-4 border-r border-neutral-200 dark:border-neutral-800 select-none text-neutral-500 dark:text-neutral-400 tabular-nums";

const tokenClass = {
  key: "text-neutral-950 dark:text-neutral-50",
  punct: "text-neutral-600 dark:text-neutral-300",
  string: "text-emerald-800 dark:text-emerald-300",
  number: "text-blue-700 dark:text-blue-300",
  boolean: "text-violet-700 dark:text-violet-300",
  null: "text-rose-700 dark:text-rose-300",
  muted: "text-neutral-500 dark:text-neutral-400",
} as const;

type ValueTone = "string" | "number" | "boolean" | "null" | "plain";

interface ValueToken {
  text: string;
  tone: ValueTone;
}

interface CodeRow {
  kind: "code";
  number: number;
  depth: number;
  togglePath: string | null;
  expanded: boolean;
  key?: string;
  value?: ValueToken;
  bracket: "{" | "}" | "[" | "]" | "{}" | "[]" | "{...}" | "[...]" | null;
  comma: boolean;
}

type JsonRow = CodeRow;

function isBranch(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

function lineCount(value: unknown): number {
  if (!isBranch(value)) return 1;
  const children = Array.isArray(value) ? value : Object.values(value);
  if (children.length === 0) return 1;
  let lines = 2;
  for (const child of children) lines += lineCount(child);
  return lines;
}

function primitiveToken(value: unknown): ValueToken {
  if (value === null) return { text: "null", tone: "null" };
  if (typeof value === "string") return { text: JSON.stringify(value), tone: "string" };
  if (typeof value === "number") return { text: String(value), tone: "number" };
  if (typeof value === "boolean") return { text: String(value), tone: "boolean" };
  return { text: String(value), tone: "plain" };
}

function branchEntries(value: object, path: string) {
  if (Array.isArray(value)) {
    return value.map((child, index) => ({
      key: undefined as string | undefined,
      child: child as unknown,
      path: `${path}/i:${index}`,
    }));
  }
  return Object.entries(value).map(([key, child]) => ({
    key,
    child,
    path: `${path}/k:${encodeURIComponent(key)}`,
  }));
}

// Line numbers belong to the fully expanded document. A collapsed branch is one
// `{ ... }` row on its opening line; the lines inside it disappear from the gutter.
function buildJsonRows(value: unknown, collapsed: ReadonlySet<string>): JsonRow[] {
  const rows: JsonRow[] = [];
  const cursor = { n: 0 };

  const emit = (
    current: unknown,
    path: string,
    depth: number,
    key: string | undefined,
    comma: boolean,
  ) => {
    if (!isBranch(current)) {
      cursor.n += 1;
      rows.push({
        kind: "code",
        number: cursor.n,
        depth,
        togglePath: null,
        expanded: false,
        key,
        value: primitiveToken(current),
        bracket: null,
        comma,
      });
      return;
    }

    const entries = branchEntries(current, path);
    const openBracket = Array.isArray(current) ? "[" : "{";
    const closeBracket = Array.isArray(current) ? "]" : "}";

    if (entries.length === 0) {
      cursor.n += 1;
      rows.push({
        kind: "code",
        number: cursor.n,
        depth,
        togglePath: null,
        expanded: false,
        key,
        bracket: Array.isArray(current) ? "[]" : "{}",
        comma,
      });
      return;
    }

    cursor.n += 1;
    const openNumber = cursor.n;

    if (collapsed.has(path)) {
      for (const entry of entries) cursor.n += lineCount(entry.child);
      cursor.n += 1;
      rows.push({
        kind: "code",
        number: openNumber,
        depth,
        togglePath: path,
        expanded: false,
        key,
        bracket: Array.isArray(current) ? "[...]" : "{...}",
        comma,
      });
      return;
    }

    rows.push({
      kind: "code",
      number: openNumber,
      depth,
      togglePath: path,
      expanded: true,
      key,
      bracket: openBracket,
      comma: false,
    });

    entries.forEach((entry, index) => {
      emit(entry.child, entry.path, depth + 1, entry.key, index < entries.length - 1);
    });
    cursor.n += 1;
    rows.push({
      kind: "code",
      number: cursor.n,
      depth,
      togglePath: null,
      expanded: false,
      bracket: closeBracket,
      comma,
    });
  };

  emit(value, "$", 0, undefined, false);
  return rows;
}

interface LineNumbersProps {
  count: number;
}

function LineNumbers({ count }: LineNumbersProps) {
  return (
    <div className={cn(lineNumberClass, "shrink-0")} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="text-right">
          {index + 1}
        </div>
      ))}
    </div>
  );
}

interface JsonTreeProps {
  data: object;
  collapsed: ReadonlySet<string>;
  onToggle: (path: string) => void;
}

function JsonTree({ data, collapsed, onToggle }: JsonTreeProps) {
  const rows = useMemo(() => buildJsonRows(data, collapsed), [data, collapsed]);
  const widest = String(lineCount(data)).length;

  return (
    <div className="flex font-mono text-sm leading-6">
      <div
        className={cn(lineNumberClass, "shrink-0")}
        style={{ minWidth: `${Math.max(widest, 3)}ch` }}
      >
        {rows.map((row) => (
          <div key={row.number} className="h-6 text-right leading-6">
            {row.number}
          </div>
        ))}
      </div>
      <div className="min-w-0 flex-1 pl-4">
        {rows.map((row) => (
          <JsonCodeLine key={row.number} row={row} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}

interface JsonCodeLineProps {
  row: CodeRow;
  onToggle: (path: string) => void;
}

function JsonCodeLine({ row, onToggle }: JsonCodeLineProps) {
  const content = (
    <>
      <span className="inline-flex h-6 w-4 shrink-0 items-center justify-center">
        {row.togglePath ? (row.expanded ? "▾" : "▸") : null}
      </span>
      {row.key !== undefined && (
        <>
          <span className={tokenClass.key}>{row.key}</span>
          <span className={tokenClass.punct}>: </span>
        </>
      )}
      {row.value && (
        <span className={tokenClass[row.value.tone === "plain" ? "key" : row.value.tone]}>
          {row.value.text}
        </span>
      )}
      {row.bracket === "{...}" || row.bracket === "[...]" ? (
        <>
          <span className={tokenClass.punct}>
            {row.bracket === "{...}" ? "{ " : "[ "}
          </span>
          <span className={tokenClass.muted}>...</span>
          <span className={tokenClass.punct}>
            {row.bracket === "{...}" ? " }" : " ]"}
          </span>
        </>
      ) : (
        row.bracket && <span className={tokenClass.punct}>{row.bracket}</span>
      )}
      {row.comma && <span className={tokenClass.punct}>,</span>}
    </>
  );

  const className =
    "flex h-6 w-full items-center whitespace-nowrap border-0 bg-transparent p-0 text-left leading-6";

  if (!row.togglePath) {
    return (
      <div className={className} style={{ paddingLeft: row.depth * 16 }}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cn(className, tokenClass.punct, "cursor-pointer")}
      style={{ paddingLeft: row.depth * 16 }}
      aria-expanded={row.expanded}
      onClick={() => onToggle(row.togglePath as string)}
    >
      {content}
    </button>
  );
}

export default function JsonFormatterPage() {
  const t = useTranslations("jsonTool");
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState<object | null>(null);
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [showTreeView, setShowTreeView] = useState(true);
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(
    () => new Set(),
  );

  const acceptParsed = (parsed: object) => {
    setCollapsedPaths(new Set());
    setFormatted(parsed);
    setError("");
  };

  const toggleCollapsed = (path: string) => {
    setCollapsedPaths((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleFormat = () => {
    try {
      acceptParsed(JSON.parse(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : t("invalidJson"));
      setFormatted(null);
    }
  };

  const handleClear = () => {
    setInput("");
    setFormatted(null);
    setCollapsedPaths(new Set());
    setError("");
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      acceptParsed(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, indent));
      acceptParsed(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const getFormattedOutput = () => {
    if (formatted) {
      return JSON.stringify(formatted, null, indent);
    }
    return "";
  };

  return (
    <main className="relative min-h-screen p-6 md:p-12 lg:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      <Reveal>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-gray-900 via-accent-500 to-gray-800 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-center text-gray-600 dark:text-primary-400 mb-8">
            {t("subtitle")}
          </p>

          {/* Controls */}
          <Card className="mb-6 p-4">
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <Button
                onClick={handleFormat}
                className="bg-accent-600 hover:bg-accent-700 text-white"
              >
                {t("formatButton")}
              </Button>
              <Button onClick={handleBeautify} variant="outline">
                {t("beautifyButton")}
              </Button>
              <Button onClick={handleMinify} variant="outline">
                {t("minifyButton")}
              </Button>
              <Button onClick={handleClear} variant="outline">
                {t("clearButton")}
              </Button>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-primary-300">
                  {t("indentLabel")}
                </label>
                <Select
                  value={indent.toString()}
                  onValueChange={(value) => setIndent(Number(value))}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder={t("indentPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">
                      {t("spaces", { count: 2 })}
                    </SelectItem>
                    <SelectItem value="4">
                      {t("spaces", { count: 4 })}
                    </SelectItem>
                    <SelectItem value="8">
                      {t("spaces", { count: 8 })}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Error Display */}
          {error && (
            <Reveal>
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Invalid JSON</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </Reveal>
          )}

          {/* Success Display */}
          {formatted && !error && (
            <Reveal>
              <Alert className="mb-6 border-green-500 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle>{t("validJson")}</AlertTitle>
                <AlertDescription>{t("successMessage")}</AlertDescription>
              </Alert>
            </Reveal>
          )}

          {/* Two-Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Reveal>
              <Card className="flex flex-col h-[600px]">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-primary-800">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-primary-100">
                    {t("inputTitle")}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-primary-400">
                    {t("characters", { count: input.length })}
                  </span>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Paste your JSON here... e.g., {"name": "John", "age": 30}'
                  className={cn(
                    "flex-1 p-4 bg-neutral-50 dark:bg-primary-950 text-neutral-950 dark:text-neutral-50",
                    "font-mono text-sm resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-accent-500",
                    "placeholder:text-neutral-500 dark:placeholder:text-neutral-400",
                  )}
                />
              </Card>
            </Reveal>

            {/* Output Panel */}
            <Reveal delay={0.2}>
              <Card className="flex flex-col h-[600px]">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-primary-800">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-primary-100">
                    {t("outputTitle")}
                  </h2>
                  <div className="flex items-center gap-3">
                    {formatted && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-primary-400">
                          {showTreeView ? t("treeView") : t("textView")}
                        </span>
                        <Switch
                          checked={showTreeView}
                          onCheckedChange={setShowTreeView}
                        />
                      </div>
                    )}
                    {formatted && (
                      <CopyText
                        text={getFormattedOutput()}
                        tooltipText={t("copyTooltip")}
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-4 bg-neutral-50 dark:bg-primary-950">
                  {formatted ? (
                    <div>
                      {showTreeView ? (
                        /* Interactive Tree View */
                        <div>
                          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-primary-300">
                            {t("interactiveTitle")}
                          </h3>
                          <div className="p-3 bg-white dark:bg-primary-950 rounded-md border border-neutral-200 dark:border-neutral-800 overflow-x-auto text-sm font-mono">
                            <JsonTree
                              data={formatted}
                              collapsed={collapsedPaths}
                              onToggle={toggleCollapsed}
                            />
                          </div>
                        </div>
                      ) : (
                        /* Formatted Text View */
                        <div>
                          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-primary-300">
                            {t("formattedTitle")}
                          </h3>
                          <div className="p-3 bg-white text-neutral-950 dark:bg-primary-950 dark:text-neutral-50 rounded-md overflow-x-auto text-sm font-mono border border-neutral-200 dark:border-neutral-800">
                            <div className="flex">
                              <LineNumbers
                                count={getFormattedOutput().split("\n").length}
                              />
                              <pre className="flex-1 pl-4">
                                {getFormattedOutput()}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                      <p className="text-center">
                        {t("placeholder")}
                        <br />
                        <span className="text-sm">{t("clickPrompt")}</span>
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </Reveal>
          </div>

          {/* Info Section */}
          <Reveal delay={0.4}>
            <Card className="mt-6 p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-primary-200">
                {t("featuresTitle")}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-primary-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  {t("features.validation")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  {t("features.beautify")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  {t("features.minify")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  {t("features.tree")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  {t("features.copy")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  {t("features.stats")}
                </li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Reveal>
    </main>
  );
}
