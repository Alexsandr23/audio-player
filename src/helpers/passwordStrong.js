
export function passwordStrong(password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/;
    if (password.length === 0) {
        return true
    } else {
        return regex.test(password)
    }
  }