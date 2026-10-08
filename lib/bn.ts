export function bnNumber(value: number | string) {
  return Number(value).toLocaleString("bn-BD");
}

export function bnPrice(value: number | string) {
  return `${bnNumber(value)} টাকা`;
}

export function bnPercent(value: number | string) {
  return `${bnNumber(value)}%`;
}