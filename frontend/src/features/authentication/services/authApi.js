const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const data = await response.json().catch(() => ({
    success: false,
    message: 'The server returned an invalid response.',
  }))

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed.')
    error.status = response.status
    error.fieldErrors = data.errors || {}
    throw error
  }

  return data
}

export function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function loginUser(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getCurrentUser() {
  return request('/auth/me')
}

export function logoutUser() {
  return request('/auth/logout', { method: 'POST' })
}
