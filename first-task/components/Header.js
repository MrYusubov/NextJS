'use client'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <header style={{ background: '#f0f0f0', padding: '10px' }}>
      <button onClick={() => router.push('/')}>Ana Səhifə</button>
      <button onClick={() => router.push('/about')}>Haqqımızda</button>
      <button onClick={() => router.push('/services')}>Xidmətlər</button>
      <button onClick={() => router.push('/contact')}>Əlaqə</button>
    </header>
  )
}
