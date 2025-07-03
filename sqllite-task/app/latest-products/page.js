import { prisma } from '../lib/prisma'

export const revalidate = 60 // ISR

export default async function LatestProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Son Məhsullar</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - {p.price} ₼</li>
        ))}
      </ul>
    </div>
  )
}
