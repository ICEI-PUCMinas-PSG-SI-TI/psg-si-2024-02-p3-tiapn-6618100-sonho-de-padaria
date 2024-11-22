export function formatDate(isoDate) {
  if (!isoDate) return "Data inválida";

  const date = new Date(isoDate);

  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  const day = String(offsetDate.getDate()).padStart(2, "0");
  const month = String(offsetDate.getMonth() + 1).padStart(2, "0");
  const year = offsetDate.getFullYear();

  const hours = String(offsetDate.getHours()).padStart(2, "0");
  const minutes = String(offsetDate.getMinutes()).padStart(2, "0");
  const seconds = String(offsetDate.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}