'use client'
import { useEffect, useState } from 'react'


export default function CartPage(){
const [cart, setCart] = useState([])
useEffect(()=>{
const raw = localStorage.getItem('cart') || '[]'
setCart(JSON.parse(raw))
},[])


const total = cart.reduce((s, it)=> s + it.price * it.qty, 0)


return (
<section className="max-w-4xl mx-auto p-6">
<h1 className="text-2xl font-semibold mb-4">Sepet</h1>
{cart.length===0 ? <div>Sepetiniz boş.</div> : (
<div>
{cart.map((c,i)=> (
<div key={i} className="flex items-center justify-between p-3 border rounded mb-2">
<div>
<div className="font-semibold">{c.name}</div>
<div className="text-sm text-stone-600">Adet: {c.qty}</div>
</div>
<div className="font-bold">{new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY'}).format(c.price * c.qty)}</div>
</div>
))}
<div className="mt-4 text-right font-bold">Toplam: {new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY'}).format(total)}</div>
</div>
)}
</section>
)
}
