import { prisma } from '../lib/prisma'
import Link from 'next/link'

export default async function ProductsPage() {
  const products = await prisma.product.findMany()

  return (
    <div style={{ padding: '1rem' }}>
      {products.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <h2>{p.name}</h2>
          <p>{p.price} ₼</p>
          <Link href={`/products/${p.id}`}>Daha çox</Link>
        </div>
      ))}
    </div>
  )
}
