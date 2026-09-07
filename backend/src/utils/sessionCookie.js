export const SESSION_COOKIE = 'estate_session'

export function setSessionCookie(res, token, expiresAt) {
  const isProduction = process.env.NODE_ENV === 'production'
  const maxAge = Math.max(0, expiresAt.getTime() - Date.now())
  const secure = isProduction ? '; Secure' : ''
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(maxAge / 1000)}${secure}`)
}

export function clearSessionCookie(res) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`)
}

export function readSessionCookie(req) {
  const cookieHeader = req.headers.cookie || ''
  const cookies = cookieHeader.split(';').map((part) => part.trim())
  const sessionCookie = cookies.find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`))
  return sessionCookie ? sessionCookie.slice(`${SESSION_COOKIE}=`.length) : null
}
