"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import CopyText from "@/components/CopyText";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { FaFingerprint } from "react-icons/fa";

export default function UuidGeneratorPage() {
  const [count, setCount] = useState<number>(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [inputError, setInputError] = useState<string>("");

  useEffect(() => {
    generateUuids(1);
  }, []);

  const generateUuids = (num: number) => {
    const newUuids: string[] = [];
    for (let i = 0; i < num; i++) {
      // Use crypto.randomUUID() for modern browsers
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        newUuids.push(crypto.randomUUID());
      } else {
        // Fallback for older environments if necessary, though most modern ones have it
        newUuids.push(
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }),
        );
      }
    }
    setUuids(newUuids);
  };

  const handleGenerate = () => {
    if (count < 1) {
      setInputError("Minimum 1 UUID required");
      return;
    }
    if (count > 1000) {
      setInputError("Maximum 1000 UUIDs allowed");
      return;
    }
    setInputError("");
    generateUuids(count);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setCount(isNaN(val) ? 0 : val);
    setInputError("");
  };

  return (
    <main className="relative min-h-screen p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <Reveal animationType="slideDown" duration={0.8} easing="backOut">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-accent-500 to-gray-800 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              UUID Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-primary-400 max-w-2xl mx-auto">
              Generate version 4 UUIDs (Universally Unique Identifier)
              instantly.
            </p>
          </div>
        </Reveal>

        {/* Control Panel */}
        <Reveal
          animationType="fadeUp"
          delay={0.2}
          duration={0.8}
          easing="easeOut"
        >
          <Card className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="uuid-count"
                    className="block text-sm font-medium text-gray-700 dark:text-primary-300 mb-2"
                  >
                    Number of UUIDs
                  </label>
                  <input
                    id="uuid-count"
                    type="number"
                    min="1"
                    max="1000"
                    value={count}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 bg-gray-50 dark:bg-primary-900/50 border rounded-lg text-gray-900 dark:text-primary-100 placeholder-gray-400 dark:placeholder-primary-500",
                      "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent",
                      "transition-all duration-200",
                      inputError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 dark:border-primary-700",
                    )}
                  />
                  {inputError && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-2">
                      {inputError}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleGenerate}
                  className="w-full sm:w-auto px-8 py-3 h-[50px] bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-200 transform hover:scale-105"
                >
                  Generate UUIDs
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Output Section */}
        <Reveal
          animationType="fadeUp"
          delay={0.4}
          duration={0.8}
          easing="easeOut"
        >
          <Card className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-primary-200">
                  Generated UUIDs
                </h2>
                {uuids.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-primary-400 mr-2">
                      Copy All
                    </span>
                    <CopyText
                      text={uuids.join("\n")}
                      tooltipText="Copy all UUIDs"
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-primary-900/30 border border-gray-100 dark:border-primary-800 rounded-lg divide-y divide-gray-200 dark:divide-primary-800/50 max-h-[500px] overflow-y-auto">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-primary-800/20 transition-colors"
                  >
                    <span className="font-mono text-gray-800 dark:text-primary-100 break-all">
                      {uuid}
                    </span>
                    <CopyText text={uuid} tooltipText="Copy UUID" />
                  </div>
                ))}
                {uuids.length === 0 && (
                  <div className="p-8 text-center text-gray-500 dark:text-primary-500">
                    Click Generate to create UUIDs
                  </div>
                )}
              </div>
              <div className="text-right text-sm text-gray-500 dark:text-primary-500">
                Total: {uuids.length}
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
