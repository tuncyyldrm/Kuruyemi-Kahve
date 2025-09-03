import ProductCard from '../components/ProductCard'
import { getAllProducts } from '../lib/db'


export default async function Home(){
const products = await getAllProducts()
return (
<section className="max-w-6xl mx-auto p-6">
<header className="mb-6">
<h1 className="text-3xl font-bold">Gurme Kuruyemiş & Kahve</h1>
<p className="text-stone-600">Taze kavrulmuş kahveler ve doğal kuruyemişler — online mağaza.</p>
</header>


<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{products.map(p => (<ProductCard key={p.id} product={p} />))}
</div>
</section>
)
}
