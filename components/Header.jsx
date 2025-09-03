import Link from 'next/link'


export default function Header(){
return (
<header className="border-b bg-white/60 backdrop-blur sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
<Link href="/" className="font-bold text-lg">Gurme Kuruyemiş & Kahve</Link>
<nav className="ml-auto flex gap-4">
<Link href="/">Ürünler</Link>
<Link href="/cart">Sepet</Link>
<a href="#iletisim">İletişim</a>
</nav>
</div>
</header>
)
}
