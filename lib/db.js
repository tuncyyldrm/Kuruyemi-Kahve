// Basit mock veri. Üretimde DB (Prisma / Postgres / MariaDB vb.) bağlayabilirsiniz.
const PRODUCTS = [
{ id: 'k1', slug: 'etiyopya-yikanmis', name: 'Etiyopya Yıkanmış', short: 'Limon, yasemin, bal notları — 250g', desc: 'Tek kaynaklı Etiyopya çekirdekleri, yıkanmış işlem, dengeli asidite.', price: 265, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop' },
{ id: 'k2', slug: 'kolombiya-supremo', name: 'Kolombiya Supremo', short: 'Sütlü çikolata & fındık — 250g', desc: 'Orta kavrum, espresso ve filtre için uygun.', price: 245, image: 'https://images.unsplash.com/photo-1432107294469-414527cb5c65?q=80&w=1200&auto=format&fit=crop' },
{ id: 'n1', slug: 'giresun-findik', name: 'Günlük Kavrulmuş Fındık', short: 'Giresun kalite — 500g', desc: 'Taze kavrulmuş, doğal tuz kullanılmamıştır.', price: 210, image: 'https://images.unsplash.com/photo-1519112232433-56c03986a12f?q=80&w=1200&auto=format&fit=crop' },
{ id: 'n2', slug: 'antep-fistigi', name: 'Antep Fıstığı', short: 'Tuzsuz boz iç — 250g', desc: 'Özel seçilmiş Antep fıstığı, kavrulmuş seçenekleri mevcut.', price: 295, image: 'https://images.unsplash.com/photo-1457386335663-6115e304bd78?q=80&w=1200&auto=format&fit=crop' }
]


export async function getAllProducts(){
return PRODUCTS
}
export async function getProductBySlug(slug){
return PRODUCTS.find(p => p.slug === slug) || null
}
export async function getProductById(id){
return PRODUCTS.find(p => p.id === id) || null
}
