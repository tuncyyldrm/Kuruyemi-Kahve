import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

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
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
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
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Yönlendiriliyor...' : 'Satın Al'}
    </button>
  )
}
