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
  hour12 = true
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

export { formatDatetime, formatDate, formatTime };
