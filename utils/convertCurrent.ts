export const convertCurrent = (amount: string | number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+amount)
}
