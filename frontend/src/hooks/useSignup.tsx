import React from 'react'
import { useAuthContext } from '../context/AuthContext'

type SignupInputs = {
	fullName: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: string;
};

const useSignup = () => {
  const [loading, setLoading] = React.useState(false)
  const {setAuthUser} = useAuthContext()

  const signup = async (inputs : SignupInputs) => {
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }
      setAuthUser(data.user)

    } catch (error:any) {
      console.error("Error in signup", error);
    } finally {
      setLoading(false)
    }
  }
}

export default useSignup