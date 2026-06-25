export const getSeconds = (time, timeFormat) => {
  switch(timeFormat) {
    case "Seconds":
      return time
    case "Minutes":
      return time * 60
    case "Hours":
      return time * 3600
    case "Days":
      return time * 86400
    case "Weeks":
      return time * 604800
    case "Months":
      return time * 2592000
    case "Years":
      return time * 31536000
  }
}