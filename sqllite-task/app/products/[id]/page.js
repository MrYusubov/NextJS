'use client'

import useSWR from 'swr'
import { useParams } from 'next/navigation'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ProductDetail() {
  const { id } = useParams()
  const { data, error, isLoading } = useSWR(`/api/products/${id}`, fetcher)

  if (isLoading) return <p>Yüklənir...</p>
  if (error) return <p>Xəta baş verdi</p>

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{data.name}</h1>
      <p>{data.price} ₼</p>
      <p>{data.desc}</p>
    </div>
  )
}
