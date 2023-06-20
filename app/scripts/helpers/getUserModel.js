const getUserModel = () => {
  return JSON.parse(localStorage.getItem('userModel'))
}
export default getUserModel
