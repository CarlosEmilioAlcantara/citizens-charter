export const createTotalTime = (time) => {
  let totalTime;
  let remainingTime;
  let formattedTime;

  if (time < 60) {
    totalTime = `${time} Seconds`
  } else if (time < 3600) {
    remainingTime = time % 60
    totalTime = 
      (Math.trunc(time / 60) === 1) && 
      "1 Minute" || 
      `${Math.trunc(time / 60)} Minutes`
  } else if (time < 86400) {
    remainingTime = time % 3600
    totalTime = 
      (Math.trunc(time / 3600) === 1) && 
      "1 Hour" || 
      `${Math.trunc(time / 3600)} Hours`
  } else if (time < 604800) {
    remainingTime = time % 86400
    totalTime = 
      (Math.trunc(time / 86400) === 1) && 
      "1 Day" || 
      `${Math.trunc(time / 86400)} Days`
  } else if (time < 2592000) {
    remainingTime = time % 604800
    totalTime = 
      (Math.trunc(time / 604800) === 1) && 
      "1 Week" || 
      `${Math.trunc(time / 604800)} Weeks`
  } else if (time < 31536000) {
    remainingTime = time % 2592000
    totalTime = 
      (Math.trunc(time / 2592000) === 1) && 
      "1 Month" || 
      `${Math.trunc(time / 2592000)} Months`
  } else {
    remainingTime = time % 31536000
    totalTime = 
      (Math.trunc(time / 31536000) === 1) && 
      "1 Year" || 
      `${Math.trunc(time / 31536000)} Years`
  }

  if (remainingTime < 60) {
    remainingTime = `${remainingTime} ${remainingTime > 1 ? 'Seconds' : 'Second'}`
  } else if (remainingTime < 3600) {
    remainingTime = 
      (Math.trunc(remainingTime / 60) === 1) && 
      "1 Minute" || 
      `${Math.trunc(remainingTime / 60)} Minutes`
  } else if (remainingTime < 86400) {
    remainingTime = 
      (Math.trunc(remainingTime / 3600) === 1) && 
      "1 Hour" || 
      `${Math.trunc(remainingTime / 3600)} Hours`
  } else if (remainingTime < 604800) {
    remainingTime = 
      (Math.trunc(remainingTime / 86400) === 1) && 
      "1 Day" || 
      `${Math.trunc(remainingTime / 86400)} Days`
  } else if (remainingTime < 2592000) {
    remainingTime = 
      (Math.trunc(remainingTime / 604800) === 1) && 
      "1 Week" || 
      `${Math.trunc(remainingTime / 604800)} Weeks`
  } else if (remainingTime < 31536000) {
    remainingTime = 
      (Math.trunc(remainingTime / 2592000) === 1) && 
      "1 Month" || 
      `${Math.trunc(remainingTime / 2592000)} Months`
  } else {
    remainingTime = 
      (Math.trunc(remainingTime / 31536000) === 1) && 
      "1 Year" || 
      `${Math.trunc(remainingTime / 31536000)} Years`
  }

  const check = remainingTime.match(/\d+/)
  if (check[0] > 0) {
    formattedTime = `${totalTime} and ${remainingTime}`
    return formattedTime;
  }

  return totalTime;
}