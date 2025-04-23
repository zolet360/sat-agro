export function formatarDataComTracos(date: Date): string {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();

  const hora = String(date.getHours()).padStart(2, "0");
  const minuto = String(date.getMinutes()).padStart(2, "0");
  const segundo = String(date.getSeconds()).padStart(2, "0");

  return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
}

export const formatData = (timestamp: string): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(date);
};
