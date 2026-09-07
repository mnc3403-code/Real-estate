import { useEffect, useState } from 'react'
import { getCurrentUser, logoutUser } from '../services/authApi.js'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getCurrentUser()
      .then((result) => { if (active) setUser(result.user) })
      .catch(() => { if (active) setUser(null) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  async function signOut() {
    await logoutUser()
    setUser(null)
  }

  return { user, loading, signOut }
}
