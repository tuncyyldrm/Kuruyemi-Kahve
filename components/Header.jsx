'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-amber-700 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Gurme Kuruyemiş & Kahve</Link>
      <Link href="/cart" className="hover:underline">Sepet</Link>
    </header>
  )
}
