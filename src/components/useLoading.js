import { useState } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(false)
  return {
    loading,
    load: async (cb) => {
      setLoading(true)
      try {
        await cb
      } catch (error) {
        throw error
      } finally {
        setLoading(false)
      }
    },
    setLoading
  }
}