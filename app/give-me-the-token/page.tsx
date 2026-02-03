"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import CopyText from "@/components/CopyText";
import { useTranslations } from "next-intl";
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

export default function AuthTokenPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const t = useTranslations("auth");
  const RATE_LIMIT_SECONDS = 3; // 3 seconds between submissions

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown <= 0) {
      setError("");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown]);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError(t("enterCode"));
      return;
    }

    // Check rate limit
    const now = Date.now();
    const timeSinceLastSubmit = (now - lastSubmitTime) / 1000;

    if (timeSinceLastSubmit < RATE_LIMIT_SECONDS) {
      const remainingTime = Math.ceil(RATE_LIMIT_SECONDS - timeSinceLastSubmit);
      setCountdown(remainingTime);
      setError(
        t("waitMessage", {
          count: remainingTime,
          plural: remainingTime > 1 ? "s" : "",
        }),
      );
      return;
    }

    setLastSubmitTime(now);
    setLoading(true);
    setError("");
    setCountdown(0);
    try {
      if (code.trim() === "WG{DONT-KNOW-THE-ANSWER-YET-PLZ-HELP}") {
        setError(t("rejectionMessage"));
        return;
      }
      const response = await axios.post("/api/auth-token", {
        code,
      });

      console.log(code);

      if (response.data.valid) {
        // Redirect to protected page
        router.push("/do-not-get-in-here");
      } else {
        setError(response.data.message || t("invalidCode"));
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || t("invalidCode"));
      } else {
        setError(t("error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-primary dark:bg-transparent! from-primary-950 via-primary-900 to-accent-900/40 flex items-center justify-center p-4 sm:p-6">
      {/* Back Button */}
      <motion.button
        onClick={handleBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-primary-900/80 hover:bg-primary-800/80 border border-primary-700/60 rounded-xl text-primary-200 hover:text-accent-400 transition-all duration-200 backdrop-blur-sm"
      >
        <FaArrowLeft className="text-xs sm:text-sm" />
        <span className="text-xs sm:text-sm font-medium">{t("back")}</span>
      </motion.button>{" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm sm:max-w-md"
      >
        <div className="bg-gradient-to-br from-primary-900/80 via-primary-950/90 to-accent-900/20 backdrop-blur-lg border border-primary-700/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl ring-4 ring-accent-800/30">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-accent-500/20 rounded-full mb-3 sm:mb-4"
            >
              <FaLock className="text-accent-400 text-xl sm:text-2xl" />
            </motion.div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-100 mb-2">
              {t("title")}
            </h1>
            <p className="text-primary-400 text-xs sm:text-sm">
              {t("description")}
            </p>
          </div>{" "}
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs sm:text-sm text-center mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-2 sm:p-3"
            >
              {error}
            </motion.div>
          )}
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-xs sm:text-sm font-medium text-primary-200 mb-2"
              >
                {t("accessCode")}
              </label>
              <div className="relative">
                <input
                  id="code"
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-primary-900/50 border border-primary-800 rounded-lg sm:rounded-xl text-primary-100 placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  placeholder={t("placeholder")}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-accent-400 transition-colors text-sm sm:text-base"
                  disabled={loading}
                >
                  {showCode ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>{" "}
            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || countdown > 0}
              whileHover={{ scale: loading || countdown > 0 ? 1 : 1.02 }}
              whileTap={{ scale: loading || countdown > 0 ? 1 : 0.98 }}
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-accent-600 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-accent-500 disabled:hover:to-accent-600 text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-sm sm:text-base">{t("verifying")}</span>
                </div>
              ) : countdown > 0 ? (
                <span className="text-sm sm:text-base">
                  {t("wait", {
                    count: countdown,
                    plural: countdown > 1 ? "s" : "",
                  })}
                </span>
              ) : (
                <span className="text-sm sm:text-base">{t("submit")}</span>
              )}
            </motion.button>
          </form>
          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="text-primary-500 text-xs">
              {t("tryThis")}
              <span className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-1">
                <span className="text-nowrap">
                  &quot;WG&#123;DONT-KNOW-THE-ANSWER-YET-PLZ-HELP&#125;&quot;
                </span>
                <CopyText text="WG{DONT-KNOW-THE-ANSWER-YET-PLZ-HELP}" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
