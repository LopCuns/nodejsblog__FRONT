const getCurrentDate = () => {
  const fullDate = new Date()
  const currentYear = fullDate.getFullYear()
  const currentMonth = fullDate.getMonth() + 1
  const currentDay = fullDate.getDay()
  return `${currentYear}-${
    currentMonth >= 10 ? currentMonth : `0${currentMonth}`
  }-${currentDay >= 10 ? currentDay : `0${currentDay}`}`
}
export default getCurrentDate
