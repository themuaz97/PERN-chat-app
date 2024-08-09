import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useLogout = () => {
  const [loading, setLoading] = React.useState(false)
  const {setAuthUser} = useAuthContext() // for update the authUser in AuthContext

  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }
      setAuthUser(null)

    } catch (error:any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {loading, logout}
}

export default useLogout