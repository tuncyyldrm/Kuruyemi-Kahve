import { getProductBySlug } from '../../../lib/db'
import ProductPageClient from './ProductPageClient'

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug)
  if (!product) return <div className="p-6">Ürün bulunamadı</div>
  return <ProductPageClient product={product} />
}
