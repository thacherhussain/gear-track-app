export default function validateLogin(email: string, password: string) {
  type State = {
    email?: string
    password?: string
  }

  let errors: State = {}

  // Email Errors
  if (!email) {
    errors.email = 'Email Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = 'Invalid email address'
  }
  // Password Errors
  if (!password) {
    errors.password = 'Password Required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}
