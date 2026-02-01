"use client";

import { useState, useEffect } from "react";
import { LoremIpsum } from "lorem-ipsum";
import Card from "@/components/Card";
import CopyText from "@/components/CopyText";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

// Initialize lorem ipsum generator with configuration
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

/**
 * Generate random lorem ipsum text with specified word count
 */
function generateLoremText(wordCount: number): string {
  if (wordCount <= 0) return "";
  return lorem.generateWords(wordCount);
}

export default function LoremPage() {
  const t = useTranslations();
  const [wordCount, setWordCount] = useState<number>(40);
  const [inputValue, setInputValue] = useState<string>("40");
  const [generatedText, setGeneratedText] = useState<string>("");
  const [showCopiedMessage, setShowCopiedMessage] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>("");

  // Generate initial text on mount
  useEffect(() => {
    setGeneratedText(generateLoremText(40));
  }, []);

  const handleGenerate = (): void => {
    const num = parseInt(inputValue, 10);

    if (isNaN(num)) {
      setInputError("Please enter a valid number");
      return;
    }

    if (num < 1) {
      setInputError("Minimum 1 word required");
      return;
    }

    if (num > 10000) {
      setInputError("Maximum 10,000 words allowed");
      return;
    }

    setInputError("");
    setWordCount(num);
    setGeneratedText(generateLoremText(num));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setInputError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  const handleCopySuccess = (): void => {
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };

  return (
    <main className="relative min-h-screen p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <Reveal animationType="slideDown" duration={0.8} easing="backOut">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-accent-500 to-gray-800 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              {t("title", { defaultMessage: "Lorem Ipsum Generator" })}
            </h1>
            <p className="text-lg text-gray-600 dark:text-primary-400 max-w-2xl mx-auto">
              {t("subtitle", {
                defaultMessage:
                  "Generate random placeholder text for your designs and mockups",
              })}
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
              <div className="flex flex-col  sm:flex-row gap-4 items-center sm:items-end">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="word-count"
                    className="block text-sm font-medium text-gray-700 dark:text-primary-300 mb-2"
                  >
                    {t("wordCountLabel", { defaultMessage: "Number of Words" })}
                  </label>
                  <input
                    id="word-count"
                    type="number"
                    min="1"
                    max="10000"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={cn(
                      "w-full px-4 py-3 bg-gray-50 dark:bg-primary-900/50 border rounded-lg text-gray-900 dark:text-primary-100 placeholder-gray-400 dark:placeholder-primary-500",
                      "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent",
                      "transition-all duration-200",
                      inputError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 dark:border-primary-700",
                    )}
                    placeholder={t("wordCountPlaceholder", {
                      defaultMessage: "Enter word count (1-10,000)",
                    })}
                  />
                  {inputError && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-2">
                      {inputError}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleGenerate}
                  className="w-full h-full sm:w-auto px-8 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-200 transform hover:scale-105"
                >
                  {t("generateButton", { defaultMessage: "Generate" })}
                </Button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-primary-800">
                <p className="text-sm text-gray-500 dark:text-primary-400">
                  {t("currentCount", { defaultMessage: "Current:" })}{" "}
                  <span className="font-semibold text-accent-600 dark:text-accent-400">
                    {wordCount}
                  </span>{" "}
                  {t("words", { defaultMessage: "words" })}
                </p>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Generated Text Display */}
        <Reveal
          animationType="fadeUp"
          delay={0.4}
          duration={0.8}
          easing="easeOut"
        >
          <Card className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-primary-200">
                  {t("generatedTitle", { defaultMessage: "Generated Text" })}
                </h2>
                <div className="flex items-center gap-3">
                  {showCopiedMessage && (
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium animate-fade-in">
                      {t("copied", { defaultMessage: "Copied!" })}
                    </span>
                  )}
                  <div onClick={handleCopySuccess}>
                    <CopyText
                      text={generatedText}
                      tooltipText={t("copyTooltip", {
                        defaultMessage: "Copy to clipboard",
                      })}
                      className="!p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="min-h-[200px] p-4 bg-gray-50 dark:bg-primary-900/30 border border-gray-100 dark:border-primary-800 rounded-lg">
                <p className="text-gray-700 dark:text-primary-300 leading-relaxed whitespace-pre-wrap break-words">
                  {generatedText ||
                    t("placeholderText", {
                      defaultMessage:
                        "Click Generate to create lorem ipsum text...",
                    })}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-primary-500">
                <span>
                  {t("characterCount", {
                    count: generatedText.length,
                    defaultMessage: `${generatedText.length} characters`,
                  })}
                </span>
                <span>
                  {t("wordCountResult", {
                    count: wordCount,
                    defaultMessage: `${wordCount} words`,
                  })}
                </span>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Info Section */}
        <Reveal
          animationType="scale"
          delay={0.6}
          duration={0.8}
          easing="backOut"
        >
          <Card className="p-6 md:p-8 bg-white/40 dark:bg-primary-900/40 border-accent-500/10 dark:border-accent-500/20 shadow-sm">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-primary-200">
                {t("whatIsTitle", { defaultMessage: "What is Lorem Ipsum?" })}
              </h3>
              <p className="text-gray-600 dark:text-primary-400 text-sm leading-relaxed max-w-2xl mx-auto">
                {t("whatIsDescription", {
                  defaultMessage:
                    "Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. It helps designers focus on design elements without being distracted by meaningful content.",
                })}
              </p>
            </div>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
