export const normalizeNumber = (number) => {
  return (
    /\.00$/.test(number) ? 
      number.replace(/\.00$/, "") : 
    /\.([1-9])0$/.test(number) ? 
      number.replace(/\.([1-9])0$/, ".$1") : 
    number
  )
}