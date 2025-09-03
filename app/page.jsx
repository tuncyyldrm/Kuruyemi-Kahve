import { getAllProducts } from '../lib/db'
import ProductCard from '../components/ProductCard'

export default async function HomePage() {
  const products = await getAllProducts()
  return (
    <section className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </section>
  )
}
