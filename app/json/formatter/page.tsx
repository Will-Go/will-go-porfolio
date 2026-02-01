"use client";

import { useState } from "react";
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
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState<object | null>(null);
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [showTreeView, setShowTreeView] = useState(true);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(parsed);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setFormatted(null);
    }
  };

  const handleClear = () => {
    setInput("");
    setFormatted(null);
    setError("");
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setFormatted(parsed);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, indent));
      setFormatted(parsed);
      setError("");
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
            JSON Formatter
          </h1>
          <p className="text-center text-gray-600 dark:text-primary-400 mb-8">
            Format, validate, and beautify your JSON data
          </p>

          {/* Controls */}
          <Card className="mb-6 p-4">
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <Button
                onClick={handleFormat}
                className="bg-accent-600 hover:bg-accent-700 text-white"
              >
                Format JSON
              </Button>
              <Button onClick={handleBeautify} variant="outline">
                Beautify
              </Button>
              <Button onClick={handleMinify} variant="outline">
                Minify
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-primary-300">
                  Indent:
                </label>
                <Select
                  value={indent.toString()}
                  onValueChange={(value) => setIndent(Number(value))}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Select indent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 spaces</SelectItem>
                    <SelectItem value="4">4 spaces</SelectItem>
                    <SelectItem value="8">8 spaces</SelectItem>
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
                <AlertTitle>Valid JSON</AlertTitle>
                <AlertDescription>
                  Your JSON has been successfully formatted and validated.
                </AlertDescription>
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
                    Input
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-primary-400">
                    {input.length} characters
                  </span>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Paste your JSON here... e.g., {"name": "John", "age": 30}'
                  className={cn(
                    "flex-1 p-4 bg-gray-50 dark:bg-primary-950/20 text-gray-900 dark:text-primary-100",
                    "font-mono text-sm resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-accent-500",
                    "placeholder:text-gray-400 dark:placeholder-primary-500",
                  )}
                />
              </Card>
            </Reveal>

            {/* Output Panel */}
            <Reveal delay={0.2}>
              <Card className="flex flex-col h-[600px]">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-primary-800">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-primary-100">
                    Output
                  </h2>
                  <div className="flex items-center gap-3">
                    {formatted && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-primary-400">
                          {showTreeView ? "Tree View" : "Text View"}
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
                        tooltipText="Copy formatted JSON"
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-primary-950/20">
                  {formatted ? (
                    <div>
                      {showTreeView ? (
                        /* Interactive Tree View */
                        <div>
                          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-primary-300">
                            Interactive Tree View:
                          </h3>
                          <div className="p-3 bg-white dark:bg-primary-900/50 rounded-md border border-gray-100 dark:border-primary-800 overflow-x-auto text-sm font-mono">
                            <div className="flex">
                              <div className="pr-4 border-r border-gray-200 dark:border-primary-800 select-none text-gray-400 dark:text-primary-500">
                                {getFormattedOutput()
                                  .split("\n")
                                  .map((_, i) => (
                                    <div key={i} className="text-right">
                                      {i + 1}
                                    </div>
                                  ))}
                              </div>
                              <div className="flex-1 pl-4">
                                <JsonView
                                  data={formatted}
                                  shouldExpandNode={allExpanded}
                                  style={{
                                    ...defaultStyles,
                                    container: "font-mono text-sm",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Formatted Text View */
                        <div>
                          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-primary-300">
                            Formatted Text:
                          </h3>
                          <div className="p-3 bg-white text-gray-900 dark:bg-primary-900/50 dark:text-primary-100 rounded-md overflow-x-auto text-sm font-mono border border-gray-100 dark:border-primary-800">
                            <div className="flex">
                              <div className="pr-4 border-r border-gray-200 dark:border-primary-800 select-none text-gray-400 dark:text-primary-500">
                                {getFormattedOutput()
                                  .split("\n")
                                  .map((_, i) => (
                                    <div key={i} className="text-right">
                                      {i + 1}
                                    </div>
                                  ))}
                              </div>
                              <pre className="flex-1 pl-4">
                                {getFormattedOutput()}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 dark:text-primary-500">
                      <p className="text-center">
                        Formatted JSON will appear here
                        <br />
                        <span className="text-sm">
                          Click &quot;Format JSON&quot; to validate and format
                        </span>
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
                Features:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-primary-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  Real-time JSON validation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Beautify with custom indentation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Minify JSON to single line
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Interactive tree view
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Copy formatted output
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Character count display
                </li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Reveal>
    </main>
  );
}
