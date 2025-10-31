"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaSignOutAlt, FaCrown, FaLinkedin } from "react-icons/fa";
import axios from "axios";

export default function ProtectedPage() {
  const router = useRouter();
  const t = useTranslations("protected");

  const handleLogout = async () => {
    await axios.post("/api/logout");

    // Redirect to the auth page
    router.replace("/give-me-the-token");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-accent-900/40 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg sm:max-w-2xl"
      >
        <div className="bg-gradient-to-br from-primary-900/80 via-primary-950/90 to-accent-900/20 backdrop-blur-lg border border-primary-700/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl ring-4 ring-accent-800/30">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent-500/20 to-green-500/20 rounded-full mb-4 sm:mb-6"
            >
              <FaCrown className="text-accent-400 text-2xl sm:text-3xl" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-100 mb-2">
              {t("congratulations")}
            </h1>
            <p className="text-primary-400 text-sm sm:text-base">
              {t("welcome")}
            </p>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Welcome Message */}
            <div className="bg-primary-900/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary-800/40 text-center">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-100 mb-3">
                {t("thankYou")}
              </h2>
              <p className="text-primary-300 leading-relaxed text-sm sm:text-base">
                {t("appreciation")}
              </p>
            </div>

            {/* Connect Section */}
            <div className="bg-accent-900/20 rounded-xl p-4 sm:p-6 border border-accent-800/30 text-center">
              <h3 className="text-lg sm:text-xl font-medium text-accent-200 mb-4">
                {t("letsConnect")}
              </h3>
              <p className="text-primary-400 text-sm sm:text-base mb-6">
                {t("connectDescription")}
              </p>
              <motion.a
                href="https://www.linkedin.com/in/wilsongw60/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white font-semibold rounded-xl hover:from-blue-600/80 hover:to-blue-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-primary-900 transition-all duration-200"
              >
                <FaLinkedin className="text-xl" />
                {t("connectLinkedIn")}
              </motion.a>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex justify-end mt-6 sm:mt-8">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white font-semibold rounded-lg sm:rounded-xl hover:from-red-600/80 hover:to-red-700/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-primary-900 transition-all duration-200 text-sm sm:text-base"
            >
              <FaSignOutAlt className="text-sm sm:text-base" />
              {t("logoutExit")}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
