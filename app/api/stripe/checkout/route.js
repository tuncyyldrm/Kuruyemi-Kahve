import Stripe from 'stripe'
import { getProductById } from '../../../../lib/db'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const body = await req.json()
  const productId = body.productId
  const product = await getProductById(productId)

  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'try',
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?cancel=1`,
  })

  return NextResponse.json({ id: session.id })
}
