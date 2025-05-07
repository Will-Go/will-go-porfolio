const LOCALE = "en-US";

// Función para formatear la fecha a un formato más legible y compacto
const formatDatetime = (
  isoDate: string,
  showSeconds = false,
  hour12 = true
): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
    hour12: hour12,
  };

  return date.toLocaleString(LOCALE, options);
};

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  return date.toLocaleString(LOCALE, options);
};

export { formatDatetime, formatDate };
