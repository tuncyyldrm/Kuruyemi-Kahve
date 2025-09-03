import Link from 'next/link'
import Image from 'next/image'


export default function ProductCard({ product }){
return (
<article className="border rounded-2xl overflow-hidden shadow-sm bg-white">
<div className="relative aspect-[4/3]">
<Image src={product.image} fill alt={product.name} className="object-cover" />
</div>
<div className="p-4">
<h3 className="font-semibold">{product.name}</h3>
<p className="text-sm text-stone-600">{product.short}</p>
<div className="mt-3 flex items-center justify-between">
<div className="font-bold">{new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY'}).format(product.price)}</div>
<Link href={`/product/${product.slug}`} className="text-sm underline">Detay</Link>
</div>
</div>
</article>
)
}
