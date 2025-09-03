import './globals.css'
import '../styles/globals.css'

import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Gurme Kuruyemiş & Kahve',
  description: 'En kaliteli kuruyemiş ve kahve ürünleri',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-stone-50 text-stone-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
