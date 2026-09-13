export function removeHTMLtags(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}
