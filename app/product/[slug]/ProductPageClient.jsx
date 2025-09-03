'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function ProductPageClient({ product }) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      })
      const data = await res.json()
      if (data.id) {
        const stripe = await (await import('@stripe/stripe-js')).loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        )
        await stripe.redirectToCheckout({ sessionId: data.id })
      } else {
        alert('Checkout hatası!')
      }
    } catch (err) {
      console.error(err)
      alert('Bir hata oluştu.')
    }
    setLoading(false)
  }

  return (
    <section className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <div className="relative aspect-[4/3]">
        <Image src={product.image} fill alt={product.name} className="object-cover rounded-2xl" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="mt-2 text-stone-600">{product.desc}</p>
        <div className="mt-4 text-xl font-semibold">
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price)}
        </div>
        <div className="mt-6">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 disabled:opacity-50"
          >
            {loading ? 'Yönlendiriliyor...' : 'Satın Al'}
          </button>
        </div>
      </div>
    </section>
  )
}
