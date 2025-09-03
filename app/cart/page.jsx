'use client'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

// Stripe publishable key (NEXT_PUBLIC_ ile başlar)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('cart') || '[]'
    setCart(JSON.parse(raw))
  }, [])

  const total = cart.reduce((sum, it) => sum + it.price * it.qty, 0)

  // Checkout başlat
  const handleCheckout = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: cart[0]?.id }) // örnek: sadece ilk ürünü gönderiyor
      })
      const data = await res.json()
      if (!data.id) throw new Error(data.error || 'Stripe oturumu oluşturulamadı.')

      const stripe = await stripePromise
      await stripe.redirectToCheckout({ sessionId: data.id })
    } catch (err) {
      console.error('Checkout Error:', err)
      alert('Ödeme sırasında hata: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sepet</h1>
      {cart.length === 0 ? (
        <div>Sepetiniz boş.</div>
      ) : (
        <div>
          {cart.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded mb-2">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-stone-600">Adet: {c.qty}</div>
              </div>
              <div className="font-bold">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(c.price * c.qty)}
              </div>
            </div>
          ))}
          <div className="mt-4 text-right font-bold">
            Toplam: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(total)}
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 disabled:opacity-50"
            >
              {loading ? 'Yönlendiriliyor...' : 'Satın Al'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
