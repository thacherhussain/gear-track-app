import React, { useState } from 'react'

function useForm(initialState) {
  function handleChange(initialState) {
    const [values, setValues] = useState(initialState)

    const setState = (key) => (value) =>
      setValues((prev) => ({ ...prev, [key]: value }))

    return {
      ...values,
      setState,
    }
  }

  function handleBlur() {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  return { handleChange, handleBlur }
}

export default useForm
