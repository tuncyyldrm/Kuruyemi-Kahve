'use client'
import { useEffect, useState } from 'react'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('cart') || '[]'
    setCart(JSON.parse(raw))
  }, [])

  const total = cart.reduce((s, it) => s + it.price * it.qty, 0)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
      })

      const data = await res.json()
      if (data.id) {
        const stripe = await (await import('@stripe/stripe-js')).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
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
          <div className="mt-4 text-right">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Yönlendiriliyor...' : 'Ödeme Yap'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
