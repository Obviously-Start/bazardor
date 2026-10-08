export function bnNumber(value: number | string) {
  return Number(value).toLocaleString("bn-BD");
}

export function bnPrice(value: number | string) {
  return `${bnNumber(value)} টাকা`;
}

export function bnPercent(value: number | string) {
  return `${bnNumber(value)}%`;
}

export function getTodayDate() {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}