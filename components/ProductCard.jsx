import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/3] mb-2">
          <Image src={product.image} fill alt={product.name} className="object-cover rounded-lg" />
        </div>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-amber-700 font-bold mt-1">
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price)}
        </p>
      </Link>
    </div>
  )
}
