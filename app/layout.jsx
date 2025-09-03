import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'


export const metadata = {
title: 'Gurme Kuruyemiş & Kahve',
description: 'Taze kuruyemişler ve özenle seçilmiş kahveler.'
}


export default function RootLayout({ children }){
return (
<html lang="tr">
<body>
<Header />
<main className="min-h-[70vh]">{children}</main>
<Footer />
</body>
</html>
)
}
