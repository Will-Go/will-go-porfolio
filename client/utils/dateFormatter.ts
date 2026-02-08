import dayjs from "dayjs";
import "dayjs/locale/es";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

/**
 * Formats a date string to a readable date and time based on locale
 * @param isoDate ISO date string
 * @param locale Locale string (e.g., 'en', 'es')
 * @param showSeconds whether to show seconds
 * @param hour12 whether to use 12-hour format
 */
const formatDatetime = (
  isoDate: string,
  locale = "en",
  showSeconds = false,
  hour12 = true,
): string => {
  const d = dayjs(isoDate).locale(locale);

  if (showSeconds) {
    return d.format(hour12 ? "LLL:ss A" : "LLL:ss");
  }
  return d.format(hour12 ? "LLL A" : "LLL");
};

/**
 * Formats a date string to a readable date based on locale
 * @param isoDate ISO date string
 * @param locale Locale string (e.g., 'en', 'es')
 */
const formatDate = (isoDate: string, locale = "en"): string => {
  return dayjs(isoDate).locale(locale).format("LL");
};

/**
 * Formats a date string to a readable time based on locale
 * @param isoDate ISO date string
 * @param locale Locale string (e.g., 'en', 'es')
 */
const formatTime = (isoDate: string, locale = "en"): string => {
  return dayjs(isoDate).locale(locale).format("LT");
};

/**
 * Calculates the duration from a given date to now
 * Returns years if >= 1 year, months if < 1 year but >= 1 month, or days
 * @param isoDate ISO date string
 * @param locale Locale string (e.g., 'en', 'es')
 */
const dateToCountYears = (
  isoDate: string,
): { type: "years" | "months" | "days"; count: number } => {
  const now = dayjs();
  const date = dayjs(isoDate);

  const years = now.diff(date, "year");
  if (years >= 1) {
    return { type: "years", count: years };
  }

  const months = now.diff(date, "month");
  if (months >= 1) {
    return { type: "months", count: months };
  }

  const days = now.diff(date, "day");
  // Ensure at least 0 days if date is future (though unlikely for skills)
  return { type: "days", count: Math.max(0, days) };
};

export { formatDatetime, formatDate, formatTime, dateToCountYears };
