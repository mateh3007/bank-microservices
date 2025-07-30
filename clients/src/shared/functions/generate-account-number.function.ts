export function GenerateAccountNumber(): string {
  const base = Math.floor(10000000 + Math.random() * 90000000);
  const dv = calculateDV(base.toString());
  return `${base}-${dv}`;
}

function calculateDV(number: string): string {
  let sum = 0;
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < number.length; i++) {
    sum += parseInt(number[i]) * weights[i];
  }

  const remainder = sum % 11;

  if (remainder < 2) {
    return '0';
  } else {
    return String(11 - remainder);
  }
}
