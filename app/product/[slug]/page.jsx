import { getProductBySlug } from '../../../lib/db'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default async function ProductPage({ params }){
const product = await getProductBySlug(params.slug)
if(!product) return <div className="p-6">Ürün bulunamadı</div>


return (
<section className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
<div className="relative aspect-[4/3]">
<Image src={product.image} fill alt={product.name} className="object-cover rounded-2xl" />
</div>
<div>
<h2 className="text-2xl font-bold">{product.name}</h2>
<p className="mt-2 text-stone-600">{product.desc}</p>
<div className="mt-4 text-xl font-semibold">{new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY'}).format(product.price)}</div>
<form action="/api/stripe/checkout" method="POST" className="mt-6">
<input type="hidden" name="productId" value={product.id} />
<button className="bg-amber-700 text-white px-4 py-2 rounded">Satın Al (Stripe Test)</button>
</form>
</div>
</section>
)
}
