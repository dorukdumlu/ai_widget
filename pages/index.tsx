import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mistral Carrera Fitness & Spa - İzmir Spor Salonu</title>
        <meta name="description" content="Mistral Carrera Fitness & Spa - İzmir'in en modern spor merkezi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen relative">
        {/* Carrera Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://www.carreramistral.com/images/hero-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Header */}
        <header className="relative z-40 bg-black/90 backdrop-blur-sm sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CM</span>
                </div>
                <div>
                  <h1 className="text-white text-xl font-bold">MISTRAL CARRERA</h1>
                  <p className="text-gray-300 text-sm">Fitness & Spa</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-white hover:text-red-400 transition-colors">Anasayfa</a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">Hakkımızda</a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">Diyetisyen</a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">Ders Programı</a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">İletişim</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-30 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              SİZİ <span className="text-red-500">ARAYALIM</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Bilgi almak ve ücretsiz postür analizi için Formu Doldurun
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              GÖNDER
            </button>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative z-30 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-4xl font-bold text-white mb-6 text-center">
                Mistral Carrera Fitness & Spa
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Mistral Carrera, İzmir'in gözde yaşam merkezi olan Bayraklı Mistral Towers'da faaliyet göstermektedir. 
                Sadece bir "spor salonu" olarak anılmak için değil, sağlıklı yaşamı benimseten, spor yaptırmayı sevdiren 
                yeni bir "yaşam alanı" olmak üzere kurulmuştur.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💪</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">FITNESS</h3>
                  <p className="text-gray-300">Son teknoloji ekipmanlarla en iyi antrenman deneyimi</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🏊</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">HAVUZ</h3>
                  <p className="text-gray-300">Açılıp kapanabilen teknoloji ile modern havuz</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🧘</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">SPA</h3>
                  <p className="text-gray-300">Hamam, sauna ve masaj ile rahatlama</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-red-500 text-3xl mb-3">🏋️‍♀️</div>
                <h3 className="text-white font-bold mb-2">Reformer Pilates</h3>
                <p className="text-gray-300 text-sm">Eklemlere aşırı yük bindirmeden güçlü kas yapısı</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-red-500 text-3xl mb-3">🥗</div>
                <h3 className="text-white font-bold mb-2">Diyetisyen</h3>
                <p className="text-gray-300 text-sm">Beslenme ve diyet programı düzenleme</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-red-500 text-3xl mb-3">🏆</div>
                <h3 className="text-white font-bold mb-2">Etkinlikler</h3>
                <p className="text-gray-300 text-sm">Turnuvalar ve fitness yarışmaları</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-red-500 text-3xl mb-3">📱</div>
                <h3 className="text-white font-bold mb-2">3D Analiz</h3>
                <p className="text-gray-300 text-sm">Postür ve vücut analizi teknolojisi</p>
              </div>
            </div>

            <div className="bg-red-600/20 backdrop-blur-sm rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">BİZE ULAŞIN</h2>
              <div className="grid md:grid-cols-3 gap-6 text-white">
                <div>
                  <div className="text-red-400 text-2xl mb-2">📍</div>
                  <p className="font-semibold">Adres</p>
                  <p className="text-sm text-gray-300">Çınarlı Mahallesi Ankara Asfaltı Caddesi No:15/1AF Konak-İZMİR</p>
                </div>
                <div>
                  <div className="text-red-400 text-2xl mb-2">📞</div>
                  <p className="font-semibold">Telefon</p>
                  <p className="text-sm text-gray-300">444 22 17</p>
                </div>
                <div>
                  <div className="text-red-400 text-2xl mb-2">✉️</div>
                  <p className="font-semibold">E-posta</p>
                  <p className="text-sm text-gray-300">info@carreramistral.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-30 bg-black/80 backdrop-blur-sm py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
              © 2022 Mistral Carrera Fitness & Spa • Tüm hakları saklıdır.
            </p>
          </div>
        </footer>
      </div>

      {/* Demo Notice */}
      <div className="fixed top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold z-50">
        DEMO - AI Widget Aktif
      </div>

      {/* Admin Links */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        <a 
          href="/admin/login" 
          className="block bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Admin Panel
        </a>
        <a 
          href="/install" 
          className="block bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Install Guide
        </a>
      </div>
    </>
  );
}

