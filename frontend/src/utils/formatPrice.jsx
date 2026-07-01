export const formatPrice = (price) => {
  return (
    String(price)
    .replace(
      /\B(?=(\d{3})+(?!\d))/g, ","
    )
  )
}