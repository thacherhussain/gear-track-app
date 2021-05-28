import React, { useState } from 'react'

function useForm(initialState) {
  // const [values, setValues] = useState(initialState)

  // function handleChange(value) {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [value.name]: value.value,
  //   }))
  // }

  function useMultiState(defaultValues = {}) {
    const [values, setValues] = useState(defaultValues)

    const setState = (key) => (value) =>
      setValues((prev) => ({ ...prev, [key]: value }))

    return {
      ...values,
      setState,
    }
  }

  return useMultiState
}

export default useForm
