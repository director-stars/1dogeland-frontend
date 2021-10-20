const formatLotteryDate = (lotteryDate: string) => {
  if (!lotteryDate) {
    return {}
  }

  const date = new Date(lotteryDate)

  const dateString = date.toDateString()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  // const monthAndDay = dateString.split(' ').splice(1, 2).join(' ')

  return { hours, minutes }
}

export default formatLotteryDate
