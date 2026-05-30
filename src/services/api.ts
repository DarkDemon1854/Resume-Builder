import { API_BASE_URL, API_TIMEOUT_MS } from '@/constants'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
}

type ApiError = {
  message: string
  status: number
  code?: string
}

class ApiRequestError extends Error {
  readonly status: number
  readonly code?: string

  constructor({ message, status, code }: ApiError) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.code = code
  }
}

function getAuthToken(): string | null {
  try {
    const raw = localStorage.getItem('rc_auth')
    if (!raw) return null
    const parsed = JSON.parse(raw) as { state?: { user?: { token?: string } } }
    return parsed.state?.user?.token ?? null
  } catch {
    return null
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers: extraHeaders = {} } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, API_TIMEOUT_MS)

  const token = getAuthToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: options.signal ?? controller.signal,
      credentials: 'include',
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({ message: response.statusText }))) as {
        message?: string
        code?: string
      }
      throw new ApiRequestError({
        message: (errorData as { message?: string }).message ?? 'Request failed',
        status: response.status,
        code: (errorData as { code?: string }).code,
      })
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return undefined as T
    }

    return await (response.json() as Promise<T>)
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof ApiRequestError) throw error
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiRequestError({ message: 'Request timed out', status: 408 })
    }
    throw new ApiRequestError({ message: 'Network error', status: 0 })
  }
}

export const api = {
  get: <T>(endpoint: string, signal?: AbortSignal) =>
    request<T>(endpoint, { method: 'GET', signal }),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body }),

  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
}

export { ApiRequestError }
export type { ApiError }
