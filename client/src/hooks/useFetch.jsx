import { useEffect, useState } from "react"
import { useContext } from "react";
import { todoContext } from "../App";

const useFetch = (url) => {
  const { dispatch } = useContext(todoContext)
  // states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true)
      const res = await fetch(url)
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: "SET_TODO", payload: json });
        setIsLoading(false)
        setError("")
      }

      if (!res.ok) {
        setIsLoading(false)
        setError(json.error)
      }
    }
    fetchTodos()
  },[url])

  return { isLoading, error }
}

export {useFetch}