'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    price: '',
    desc: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          desc: form.desc,
        }),
      })

      if (!res.ok) throw new Error('Məhsul əlavə edilə bilmədi')

      router.push('/products')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Yeni Məhsul Əlavə Et</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          name="name"
          type="text"
          placeholder="Məhsulun adı"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Qiymət"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="desc"
          placeholder="Məhsul haqqında"
          value={form.desc}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Əlavə olunur...' : 'Əlavə et'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
