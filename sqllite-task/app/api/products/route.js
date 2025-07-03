import { prisma } from '../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { id: 'desc' } })
  return NextResponse.json(products)
}

export async function POST(req) {
  const data = await req.json()
  const product = await prisma.product.create({ data })
  return NextResponse.json(product)
}
