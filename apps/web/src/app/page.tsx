'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  // 🏛️ CORE DATABASE ARTIFACTS
  const baseArtifacts = [
    { id: '1', title: 'Sadhu Bela Temple', region: 'Sukkur', community: 'Hindu', description: 'A breathtaking historic Indus River island temple complex near Sukkur, founded in 1889 by Swami Bakhandi Maharaj.', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200', year: '1889', coordinates: '27.7124° N, 68.8584° E', approved: true },
    { id: '2', title: 'Gurdwara Pehli Patshahi', region: 'Karachi', community: 'Sikh', description: 'A historical Sikh worship place located in the heart of Sindh’s capital, serving the local community for generations.', imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=1200', year: '1940s', coordinates: '24.8607° N, 67.0011° E', approved: true },
    { id: '3', title: 'Nagarparkar Jain Temples', region: 'Tharparkar', community: 'Jain', description: 'Ancient structural masterpieces featuring classical stone carvings dating back to the 14th century at the base of Karoonjhar Hills.', imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200', year: '1375 AD', coordinates: '24.3524° N, 70.7481° E', approved: true }
  ];

  const sliderSlides = [
    { title: "Ancient Indus Valley", subtitle: "Journey through 5000 years of civilization", imageUrl: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=1600" },
    { title: "Sadhu Bela Sukkur", subtitle: "The majestic island heritage on the Indus River", imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600" }
  ];

  const museumExhibits = [
    { id: 'ex-1', title: 'Indus Civilization', modelName: 'Mohenjo-daro Gallery', description: 'Ancient artifacts from 2500 BCE showcasing the urban planning of the Indus Valley.', imgUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=1200' },
    { id: 'ex-2', title: 'Sufi Heritage', modelName: 'Shrine Architecture', description: 'Exploring the spiritual retreats of Lal Shahbaz Qalandar and Sachal Sarmast.', imgUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200' },
    { id: 'ex-3', title: 'Sikh Heritage', modelName: 'Gurdwara Art', description: 'Historical artifacts and manuscripts from the pre-partition era of Sindh.', imgUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200' }
  ];

  const sufiPoetrySlides = [
    { id: 'sufi-1', poet: 'Sachal Sarmast', sindhi: 'مون کي ملک پئي سڏائين، سڏاريا ساڳي نئون، پر مون کي ته انهيءَ سان، ڪو واسطو ڪونهي.', translation: 'People call me the king, or they call me a mendicant, but I have no relationship with either.' },
    { id: 'sufi-2', poet: 'Shah Abdul Latif Bhittai', sindhi: 'وڃي ڪي وڻجارا آيا، تين کي مون هانءِ وڌا، جين لاهوتي لال لنگھائيا.', translation: 'The traders of the soul have arrived, filling my heart with divine longing.' }
  ];

  // 🖼️ 1. VISUAL GALLERY REAL DATA MATRIX
  const galleryItems = [
    { id: 'gal-1', tag: 'sindhu_darya', title: 'Sindhu Darya at Dawn', subtitle: 'The majestic Indus River flowing calmly at sunrise near Sukkur.', url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200' },
    { id: 'gal-2', tag: 'karoonjhar_hills', title: 'Karoonjhar Granite Peaks', subtitle: 'The sanctuary of dynamic historical temples and scenic wildlife ecosystems.', url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200' },
    { id: 'gal-3', tag: 'thar_desert', title: 'Thar Desert Culture', subtitle: 'Traditional mud-brick architecture houses and resilient heritage lifestyles.', url: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=1200' }
  ];

  // 📖 2. SOUL OF SINDH USER STORIES DATA (Rich Multiline Sindhi Scripts)
  const soulStories = [
    {
      id: 'story-1',
      title: 'سنڌ جي ازلي روح',
      paragraphs: [
        'سنڌ جي روح جي بنياد رواداري، همت ۽ هم آهنگي تي قائم آهي. هي روح سنڌو درياه جي ڪنارن تي هزارين سالن کان آباد رهندڙ هڪ اهڙي تهذيب جي عڪاسي ڪري ٿو جيڪا پنهنجي ڪشادي سوچ، دانائي ۽ انسانيت سان گهري محبت جي ڪري سڃاتي وڃي ٿي.',
        'سنڌ جي روح جو مرڪز تصوف آهي جيڪو محبت، هڏڏوکي ۽ برابري جو درس ڏئي ٿو. عظيم صوفي شاعرن جهڙوڪ شاهه عبداللطيف ڀٽائي، سچل سرمست ۽ لعل شهباز قلندر ذات، مذهب ۽ فرقي ڪان مٿي ٿي انسانيت جي اتحاد جو پيغام ڏنو.'
      ],
      imgUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800'
    },
    {
      id: 'story-2',
      title: 'ثقافت جو تحفظ ۽ ورثو',
      paragraphs: [
        'اسان جو ورثو رڳو پٿرن ۽ عمارتن جو نالو ناهي، پر اهو انهن نسلن جي زندهه ڪهاڻي آهي جن پنهنجي رقت، علم، ۽ امن پسندي سان هن ڌرتي کي سينگاريو آهي.',
        'صديون گذرڻ باوجود، سنڌ جي اقليتي برادرين جا ميلا، مذهبي عبادتگاهون، ۽ روايتي هنر اڄ به پنهنجي اصل شڪل ۾ قائم آهن، جيڪي دنيا کي گڏيل تهذيب جو بهترين مثال فراهم ڪن ٿا.'
      ],
      imgUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800'
    }
  ];

  // ✍️ 3. BLOGS EDITORIAL DATA MATRIX
  const blogPosts = [
    { id: 'blog-1', date: 'June 12, 2026', title: 'The Architectural Symphony of Sadhu Bela', excerpt: 'An in-depth structural exploration into the marble designs and historical significance of the island shrine on the Indus River.', author: 'Zainab Solangi' },
    { id: 'blog-2', date: 'May 28, 2026', title: 'Preserving the Vanishing Frescoes of Nagarparkar', excerpt: 'Documenting the condition of medieval Jain wall paintings inside the hidden valley chambers of Karoonjhar.', author: 'Rohan Kumar' },
    { id: 'blog-3', date: 'April 15, 2026', title: 'Sufi Music: The Universal Anchor of Sindh', excerpt: 'How traditional musical strings and Shah Jo Raag bridge communal lines and promote cross-cultural harmony.', author: 'Dr. Akhlaq Channa' }
  ];

  const cinematicVideos = [
    { id: 'vid-1', title: 'Colors of Sindh', description: 'Gateway of Sindh, Sukkur is the third largest city in Sindh after Karachi and Hyderabad, and 17th largest city of Pakistan by population. The city was originally founded by the Rai dynasty of Sindh. The modern city was built in the 1840s.', bgUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600' }
  ];

  const [artifacts, setArtifacts] = useState<any[]>(baseArtifacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('All');

  // Navigation Router Engine State
  const [activeTab, setActiveTab] = useState('Home');

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);
  const [isMuseumOpen, setIsMuseumOpen] = useState(false);
  const [tourStarted, setTourStarted] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [currentPoetrySlide, setCurrentPoetrySlide] = useState(0);
  const [poetryFade, setPoetryFade] = useState(true);

  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);


  useEffect(() => {
    const slideTimer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderSlides.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [sliderSlides.length]);

  useEffect(() => {
    const poetryTimer = setInterval(() => {
      setPoetryFade(false);
      setTimeout(() => {
        setCurrentPoetrySlide((prev) => (prev + 1) % sufiPoetrySlides.length);
        setPoetryFade(true);
      }, 500);
    }, 7000);
    return () => clearInterval(poetryTimer);
  }, [sufiPoetrySlides.length]);

  // 🎞️ MUSEUM AUTO-PLAY SLIDESHOW ENGINE
  useEffect(() => {
    if (!isAutoPlaying || !tourStarted) return;
    const autoTimer = setInterval(() => {
      setActiveRoom((prev) => (prev + 1) % museumExhibits.length);
    }, 4000);
    return () => clearInterval(autoTimer);
  }, [isAutoPlaying, tourStarted, museumExhibits.length]);

  // ⌨️ MUSEUM KEYBOARD ARROW NAVIGATION
  useEffect(() => {
    if (!isMuseumOpen || !tourStarted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveRoom((prev) => (prev + 1) % museumExhibits.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveRoom((prev) => (prev - 1 + museumExhibits.length) % museumExhibits.length);
      } else if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else { setIsMuseumOpen(false); setTourStarted(false); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMuseumOpen, tourStarted, museumExhibits.length, isZoomed]);

  const filteredArtifacts = artifacts.filter(item =>
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.region.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCommunity === 'All' || item.community === selectedCommunity)
  );

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#14110f', minHeight: '100vh', margin: 0, color: '#f8fafc' }}>

      <link href="https://fonts.googleapis.com/css2?family=Lateef&display=swap" rel="stylesheet" />

      {/* 🧭 PREMIUM NAVIGATION BAR - Exact Layout Replication of image_dd7761.png */}
      <nav style={{ backgroundColor: '#0f0c0b', padding: '16px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #231c1a', position: 'sticky', top: 0, zIndex: 1000 }}>
        {/* Left Logo Structure */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ backgroundColor: '#d4a373', color: '#14110f', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '15px' }}>SC</div>
          <div>
            <span style={{ color: '#d4a373', fontWeight: '700', fontSize: '19px', display: 'block', lineHeight: '1.1', letterSpacing: '0.3px' }}>Sindh Culture</span>
            <span style={{ color: '#7a7a7a', fontSize: '11px', fontFamily: 'sans-serif', display: 'block', marginTop: '2px' }}>Digital Archive</span>
          </div>
        </div>


        {/* Center Menu Links Array (With Selection Highlight Bar as seen in image_dd7761.png) */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'sans-serif' }}>
          {[
            { id: 'Home', label: 'Home', icon: '🏠' },
            { id: 'User Stories', label: 'User Stories', icon: '📖' },
            { id: 'Blogs', label: 'Blogs', icon: '📄' },
            { id: 'Artifacts', label: 'Artifacts', icon: '🖼️' },
            { id: 'Submit Content', label: 'Submit Content', icon: '📤' }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id.toLowerCase().replace(' ', '-')}`}
                onClick={(e) => {
                  setActiveTab(tab.id);
                }}
                style={{
                  color: isSelected ? '#d4a373' : '#b3b3b3',
                  textDecoration: 'none',
                  fontWeight: isSelected ? '600' : '500',
                  fontSize: '13.5px',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  backgroundColor: isSelected ? 'rgba(212,163,115,0.06)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  borderBottom: isSelected ? '2px solid #d4a373' : '2px solid transparent'
                }}
              >
                <span>{tab.icon}</span> {tab.label}
              </a>
            );
          })}
        </div>

        {/* Right Access Session Controls */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontFamily: 'sans-serif' }}>
          <button style={{ background: 'none', border: 'none', color: '#b3b3b3', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🛫</span> Sign In
          </button>
          <button style={{ backgroundColor: '#d4a373', color: '#14110f', border: 'none', padding: '9px 18px', borderRadius: '6px', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>👤</span> Sign Up
          </button>
        </div><div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontFamily: 'sans-serif' }}>
  <a href="/admin-portal-sindh" style={{ backgroundColor: '#ef4444', color: 'white', padding: '9px 18px', borderRadius: '6px', fontSize: '13.5px', fontWeight: '700', textDecoration: 'none', cursor: 'pointer' }}>
    🔐 Admin
  </a>
</div>
      </nav>

      {/* 🏙️ APP CONDITIONAL VIEW CHANNELS (Dynamic presentation architecture based on active navbar node) */}
      {activeTab === 'Home' && (
        <>
          {/* HERO CAROUSEL */}
          <div style={{ position: 'relative', height: '55vh', width: '100%', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${sliderSlides[currentSlide].imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: fade ? 1 : 0, transition: 'opacity 0.5s' }}>
            <h1 style={{ fontSize: 'calc(24px + 2vw)', margin: '0 0 12px 0', fontWeight: '700', color: '#ffffff' }}>{sliderSlides[currentSlide].title}</h1>
            <p style={{ fontSize: 'calc(12px + 0.3vw)', margin: '0 0 35px 0', color: '#e5e7eb', fontFamily: 'sans-serif' }}>{sliderSlides[currentSlide].subtitle}</p>
          </div>

          {/* 3D VIRTUAL MUSEUM */}
          <div style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center', backgroundColor: '#1a1614', borderBottom: '1px solid #2e2520' }}>
            <div style={{ maxWidth: '1000px', width: '100%', backgroundColor: '#26201d', borderRadius: '16px', border: '1px solid #3d322c', padding: '50px 30px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🏛️</div>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#ffffff', margin: '0 0 10px 0' }}>3D Virtual Museum</h2>
              <button style={{ backgroundColor: '#d4a373', color: '#14110f', border: 'none', padding: '14px 36px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', marginTop: '15px' }} onClick={() => setIsMuseumOpen(true)}>Start Tour →</button>
            </div>
          </div>

          {/* SUFI POETRY */}
          <div style={{ padding: '60px 20px', backgroundColor: '#14110f', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #2e2520' }}>
            <h2 style={{ fontSize: '34px', color: '#ffffff', margin: '0 0 30px 0' }}><span style={{ color: '#d4a373' }}>❝</span> Sufi Poetry</h2>
            <div style={{ maxWidth: '1000px', width: '100%', backgroundColor: '#1c1816', borderRadius: '12px', border: '1px solid #2e2520', padding: '50px 40px', textAlign: 'center', opacity: poetryFade ? 1 : 0, transition: 'opacity 0.5s' }}>
              <h3 style={{ color: '#d4a373', fontSize: '22px', margin: '0 0 20px 0' }}>{sufiPoetrySlides[currentPoetrySlide].poet}</h3>
              <p dir="rtl" style={{ color: '#ffffff', fontSize: '32px', fontFamily: '"Lateef", serif', margin: '0 0 25px 0' }}>{sufiPoetrySlides[currentPoetrySlide].sindhi}</p>
              <p style={{ color: '#cccaa7', fontSize: '15px', fontStyle: 'italic', fontFamily: 'sans-serif' }}>"{sufiPoetrySlides[currentPoetrySlide].translation}"</p>
            </div>
          </div>
        </>
      )}

      {/* 🖼️ VISUAL GALLERY ANCHOR SUITE */}
      {(activeTab === 'Home' || activeTab === 'Artifacts') && (
        <div id="user-stories" style={{ padding: '70px 20px', backgroundColor: '#14110f', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #2e2520' }}>
          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: '700', color: '#ffffff', letterSpacing: '1px' }}>🥞 VISUAL GALLERY</h2>
            <p style={{ color: '#a3a3a3', fontSize: '14px', fontFamily: 'sans-serif', marginTop: '8px' }}>Journey through the timeless landscapes and culture of Sindh</p>
          </div>
          <div style={{ maxWidth: '1050px', width: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2e2520', height: '480px', backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.92) 25%, rgba(0,0,0,0.2) 100%), url(${galleryItems[currentGalleryIdx].url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <button onClick={() => setCurrentGalleryIdx(prev => (prev - 1 + galleryItems.length) % galleryItems.length)} style={{ position: 'absolute', left: '25px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(20,17,15,0.7)', border: '1px solid #3d322c', borderRadius: '50%', width: '44px', height: '44px', color: 'white', cursor: 'pointer' }}>‹</button>
            <button onClick={() => setCurrentGalleryIdx(prev => (prev + 1) % galleryItems.length)} style={{ position: 'absolute', right: '25px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(20,17,15,0.7)', border: '1px solid #3d322c', borderRadius: '50%', width: '44px', height: '44px', color: 'white', cursor: 'pointer' }}>›</button>
            <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
              <span style={{ backgroundColor: 'rgba(212,163,115,0.15)', color: '#d4a373', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontFamily: 'sans-serif' }}>#{galleryItems[currentGalleryIdx].tag}</span>
              <h3 style={{ fontSize: '30px', color: '#ffffff', margin: '10px 0 6px 0' }}>{galleryItems[currentGalleryIdx].title}</h3>
              <p style={{ color: '#cccaa7', fontSize: '14px', margin: 0, fontFamily: 'sans-serif' }}>{galleryItems[currentGalleryIdx].subtitle}</p>
            </div>
          </div>
        </div>
      )}

      {/* 📖 SOUL OF SINDH USER STORIES VIEW CHANNELS */}
      {(activeTab === 'Home' || activeTab === 'User Stories') && (
        <div style={{ padding: '70px 20px', backgroundColor: '#1a1614', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #2e2520' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '700', color: '#ffffff', marginBottom: '40px' }}>📖 SOUL OF SINDH</h2>
          <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: '420px 1fr', gap: '45px' }}>
            <div style={{ height: '440px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #2e2520' }}>
              <img src={soulStories[currentStoryIdx].imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div dir="rtl" style={{ textAlign: 'right' }}>
                <h3 style={{ color: '#d4a373', fontSize: '34px', fontFamily: '"Lateef", serif', margin: '0 0 20px 0' }}>{soulStories[currentStoryIdx].title}</h3>
                {soulStories[currentStoryIdx].paragraphs.map((para, i) => (
                  <p key={i} style={{ color: '#e2e8f0', fontSize: '20px', fontFamily: '"Lateef", serif', lineHeight: '1.8', marginBottom: '15px' }}>{para}</p>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2e2520', paddingTop: '20px' }}>
                <span style={{ color: '#a3a3a3', fontSize: '13px', fontFamily: 'sans-serif' }}>Story {currentStoryIdx + 1} of {soulStories.length}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setCurrentStoryIdx(prev => (prev - 1 + soulStories.length) % soulStories.length)} style={{ backgroundColor: '#26201d', border: '1px solid #3d322c', color: 'white', padding: '6px 14px', cursor: 'pointer' }}>Previous</button>
                  <button onClick={() => setCurrentStoryIdx(prev => (prev + 1) % soulStories.length)} style={{ backgroundColor: '#26201d', border: '1px solid #3d322c', color: 'white', padding: '6px 14px', cursor: 'pointer' }}>Next Story</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📄 BLOGS EDITORIAL WORKSPACE */}
      {(activeTab === 'Home' || activeTab === 'Blogs') && (
        <div style={{ padding: '70px 20px', backgroundColor: '#14110f', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #2e2520' }}>
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: '700', color: '#ffffff' }}>📄 RESEARCH & EDITORIAL BLOGS</h2>
            <p style={{ color: '#a3a3a3', fontSize: '14px', fontFamily: 'sans-serif', marginTop: '6px' }}>Historical preservation documentation and field journals by research scholars</p>
          </div>
          <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {blogPosts.map((post) => (
              <div key={post.id} style={{ backgroundColor: '#1c1816', border: '1px solid #2e2520', padding: '30px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#d4a373', fontSize: '12px', fontWeight: '600', fontFamily: 'sans-serif', display: 'block', marginBottom: '10px' }}>{post.date}</span>
                  <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0', lineHeight: '1.4' }}>{post.title}</h3>
                  <p style={{ color: '#a3a3a3', fontSize: '13.5px', fontFamily: 'sans-serif', lineHeight: '1.6', margin: 0 }}>{post.excerpt}</p>
                </div>
                <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #26201d', color: '#cccaa7', fontSize: '13px', fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                  By {post.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📤 SUBMIT CONTENT REGISTRY WORKSPACE */}
      {activeTab === 'Submit Content' && (
        <div style={{ padding: '80px 20px', backgroundColor: '#14110f', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '700px', width: '100%', backgroundColor: '#1c1816', padding: '45px', borderRadius: '12px', border: '1px solid #2e2520', fontFamily: 'sans-serif' }}>
            <h3 style={{ color: '#ffffff', fontSize: '26px', margin: '0 0 10px 0', fontFamily: 'Georgia, serif' }}>Submit Heritage Asset</h3>
            <p style={{ color: '#a3a3a3', fontSize: '14px', marginBottom: '30px' }}>Upload local cultural stories, regional photos, or architectural records to our digital archive vaults.</p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ color: '#cccaa7', fontSize: '12px', display: 'block', marginBottom: '6px' }}>ARTIFACT OR STORY TITLE</label>
                <input type="text" style={{ width: '100%', padding: '12px', backgroundColor: '#26201d', border: '1px solid #3d322c', borderRadius: '6px', color: 'white' }} placeholder="e.g., Miri Fort Wall History" />
              </div>
              <div>
                <label style={{ color: '#cccaa7', fontSize: '12px', display: 'block', marginBottom: '6px' }}>SINDHI SCRIPT OR TEXT BODY</label>
                <textarea rows={5} style={{ width: '100%', padding: '12px', backgroundColor: '#26201d', border: '1px solid #3d322c', borderRadius: '6px', color: 'white' }} placeholder="Write content here..." />
              </div>
              <button style={{ backgroundColor: '#d4a373', color: '#14110f', padding: '14px', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>Submit for Peer Review</button>
            </form>
          </div>
        </div>
      )}

      {/* CINEMATIC JOURNEY BLOCK */}
      {activeTab === 'Home' && (
        <div style={{ padding: '70px 20px', backgroundColor: '#14110f', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #2e2520' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '700', color: '#ffffff', marginBottom: '30px' }}>CINEMATIC JOURNEY</h2>
          <div style={{ maxWidth: '1050px', width: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '460px', backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.1)), url(${cinematicVideos[0].bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '74px', height: '74px', borderRadius: '50%', backgroundColor: '#d4a373', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ color: '#14110f', fontSize: '26px', marginLeft: '4px' }}>▶</span>
            </div>
            <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
              <h3 style={{ fontSize: '26px', color: '#ffffff', margin: '0 0 10px 0' }}>{cinematicVideos[0].title}</h3>
              <p style={{ color: '#a3a3a3', fontSize: '13.5px', margin: 0, fontFamily: 'sans-serif', lineHeight: '1.6' }}>{cinematicVideos[0].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BLOCK */}
      <footer style={{ backgroundColor: '#0f0c0b', padding: '40px 50px', borderTop: '1px solid #231c1a', color: '#7a7a7a', fontSize: '13px', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#d4a373', fontWeight: '700', fontSize: '15px', display: 'block', marginBottom: '4px', fontFamily: 'Georgia, serif' }}>Sincerely Sindh Archive</span>
            <p style={{ margin: 0 }}>© 2026 Cultural Heritage Preservation & Documentation Suite. All Rights Reserved.</p>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#7a7a7a', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#d4a373', textDecoration: 'none' }}>Back to Top ↑</a>
          </div>
        </div>
      </footer>

      {/* 🏛️ MUSEUM MODAL (FULLY INTERACTIVE: Welcome Screen → Start Tour → Thumbnails + Autoplay + Zoom + Sound + Keyboard) */}
      {isMuseumOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#050505', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>

          {/* Top Bar */}
          <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: tourStarted ? '1px solid #231c1a' : 'none' }}>
            {tourStarted ? (
              <h3 style={{ margin: 0, color: '#d4a373', fontSize: '18px', fontFamily: 'sans-serif', letterSpacing: '0.5px' }}>🏛️ Sindh Heritage Museum</h3>
            ) : <div />}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {tourStarted && (
                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  title={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
                  style={{ background: '#1c1816', border: '1px solid #3d322c', color: '#d4a373', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
              )}
              <button onClick={() => { setIsMuseumOpen(false); setTourStarted(false); setIsAutoPlaying(false); setIsZoomed(false); }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}>✕ Close Tour</button>
            </div>
          </div>

          {!tourStarted ? (
            /* Welcome Screen */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ color: '#d4a373', fontSize: '48px', textAlign: 'center', padding: '0 20px' }}>Welcome to Sindh Heritage Museum</h2>
              <p style={{ color: '#a3a3a3', fontFamily: 'sans-serif', maxWidth: '500px', textAlign: 'center', marginTop: '10px' }}>Explore {museumExhibits.length} curated exhibits — use thumbnails, autoplay, or arrow keys to navigate.</p>
              <button onClick={() => setTourStarted(true)} style={{ backgroundColor: '#d4a373', color: '#14110f', padding: '20px 40px', fontSize: '20px', fontWeight: 700, cursor: 'pointer', border: 'none', borderRadius: '8px', marginTop: '30px', fontFamily: 'sans-serif' }}>Start Tour</button>
            </div>
          ) : (
            /* Interactive Gallery */
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <audio
                src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8e70c5d3b.mp3"
                autoPlay
                loop
                muted={isMuted}
              />


              {/* Sidebar Thumbnails */}
              <div style={{ width: '230px', backgroundColor: '#0f0c0b', borderRight: '1px solid #231c1a', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'sans-serif' }}>
                {museumExhibits.map((exhibit, idx) => (
                  <div
                    key={exhibit.id}
                    onClick={() => { setActiveRoom(idx); setIsAutoPlaying(false); }}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: idx === activeRoom ? '2px solid #d4a373' : '2px solid transparent',
                      opacity: idx === activeRoom ? 1 : 0.6,
                      transition: 'all 0.25s ease',
                      backgroundColor: '#1c1816'
                    }}
                  >
                    <div style={{ width: '100%', height: '90px', backgroundImage: `url(${exhibit.imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div style={{ padding: '8px 10px' }}>
                      <p style={{ margin: 0, color: idx === activeRoom ? '#d4a373' : '#cccaa7', fontSize: '12px', fontWeight: 600 }}>{exhibit.modelName}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Viewer */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '20px' }}>
                <div
                  onClick={() => setIsZoomed(true)}
                  title="Click to zoom"
                  style={{ width: '70%', height: '50%', backgroundImage: `url(${museumExhibits[activeRoom].imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '15px', border: '2px solid #d4a373', cursor: 'zoom-in', position: 'relative' }}
                >
                  <span style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(15,12,11,0.75)', color: '#d4a373', fontSize: '12px', padding: '5px 10px', borderRadius: '20px', fontFamily: 'sans-serif' }}>🔍 Click to zoom</span>
                </div>
                <h3 style={{ color: '#fff', marginTop: '20px', fontSize: '28px', fontFamily: 'Georgia, serif' }}>{museumExhibits[activeRoom].modelName}</h3>
                <p style={{ color: '#a3a3a3', fontFamily: 'sans-serif', maxWidth: '600px', textAlign: 'center' }}>{museumExhibits[activeRoom].description}</p>

                {/* Progress Dots */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  {museumExhibits.map((_, idx) => (
                    <span
                      key={idx}
                      onClick={() => { setActiveRoom(idx); setIsAutoPlaying(false); }}
                      style={{
                        width: idx === activeRoom ? '22px' : '9px',
                        height: '9px',
                        borderRadius: '5px',
                        backgroundColor: idx === activeRoom ? '#d4a373' : '#3d322c',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    />
                  ))}
                </div>

                {/* Navigation + Autoplay Buttons */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '20px', fontFamily: 'sans-serif', alignItems: 'center' }}>
                  <button onClick={() => { setActiveRoom((prev) => (prev - 1 + museumExhibits.length) % museumExhibits.length); setIsAutoPlaying(false); }} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#1c1816', border: '1px solid #3d322c', borderRadius: '6px', color: 'white' }}>‹ Previous</button>
                  <button
                    onClick={() => setIsAutoPlaying((prev) => !prev)}
                    style={{ padding: '10px 22px', cursor: 'pointer', backgroundColor: isAutoPlaying ? '#d4a373' : '#1c1816', border: '1px solid #3d322c', borderRadius: '6px', color: isAutoPlaying ? '#14110f' : '#d4a373', fontWeight: 700 }}
                  >
                    {isAutoPlaying ? '⏸ Pause' : '▶ Auto-Play'}
                  </button>
                  <button onClick={() => { setActiveRoom((prev) => (prev + 1) % museumExhibits.length); setIsAutoPlaying(false); }} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#1c1816', border: '1px solid #3d322c', borderRadius: '6px', color: 'white' }}>Next ›</button>
                </div>
                <p style={{ color: '#5a5a5a', fontSize: '12px', fontFamily: 'sans-serif', marginTop: '14px' }}>Tip: use ← → arrow keys to navigate, Esc to exit</p>
              </div>
            </div>
          )}

          {/* 🔍 FULLSCREEN ZOOM OVERLAY */}
          {isZoomed && tourStarted && (
            <div
              onClick={() => setIsZoomed(false)}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
            >
              <img
                src={museumExhibits[activeRoom].imgUrl}
                alt={museumExhibits[activeRoom].modelName}
                style={{ maxWidth: '90%', maxHeight: '85%', borderRadius: '10px', border: '2px solid #d4a373', boxShadow: '0 0 60px rgba(212,163,115,0.25)' }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                style={{ position: 'absolute', top: '30px', right: '40px', background: '#ef4444', color: 'white', border: 'none', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}
              >✕</button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
