const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function http(path, options={}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.headers.get('content-type')?.includes('application/json')
    ? res.json()
    : res.text()
}

export const listBrands = () => http('/brands')
export const createBrand = (body) => http('/brands', { method: 'POST', body: JSON.stringify(body) })
export const updateBrand = (id, body) => http(`/brands/${id}`, { method: 'PUT', body: JSON.stringify(body) })
export const deleteBrand = (id) => http(`/brands/${id}`, { method: 'DELETE' })
