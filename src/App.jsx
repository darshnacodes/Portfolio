import { useEffect, useMemo, useState } from 'react';
import DynamicTechStack from './DynamicTechStack';

const services = [
  'Custom WordPress Development',
  'AI-Generated Video Ads',
  'Front-end Design',
  'Digital Brand Strategy',
];

const websites = [
  'Home Service',
  'Glam Crockery',
  'Glow & Spa Salon',
  'Beauty with Grace Salon',
  'Dream Destination',
];

const aiAds = ['AI Burger Ad', 'Maggi AI Ad', 'Model Clothing Ad', 'Restaurant Ad'];
const adInstagramLink = 'https://www.instagram.com/web.ads.creator?igsh=MTh5MGdicW8xb2R6MA==';

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorInteractive, setIsCursorInteractive] = useState(false);
  const [isCursorPressed, setIsCursorPressed] = useState(false);

  const frames = useMemo(
    () =>
      Array.from({ length: 75 }, (_, index) => {
        const padded = String(index).padStart(2, '0');
        return new URL(`../sequence/frame_${padded}_delay-0.066s.png`, import.meta.url).href;
      }),
    []
  );
    const homeImg = new URL('../photos/homeproject.png', import.meta.url).href;
    const dreamImg = new URL('../photos/dream.png', import.meta.url).href;
    const glamImg = new URL('../photos/glam.jpg', import.meta.url).href;
    const glowImg = new URL('../photos/glow.png', import.meta.url).href;
    const modelClothingVideo = new URL('../photos/modelclothing ad.mp4', import.meta.url).href;
    const restaurantVideo = new URL('../photos/resturentad.mp4', import.meta.url).href;

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 60);

    const handlePointerMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    const handlePointerDown = () => setIsCursorPressed(true);
    const handlePointerUp = () => setIsCursorPressed(false);

    const handlePointerOver = (event) => {
      const target = event.target;
      const isInteractive =
        target instanceof HTMLElement &&
        target.closest('a, button, input, textarea, select, video, [role="button"]');

      setIsCursorInteractive(Boolean(isInteractive));
    };

    const handlePointerOut = (event) => {
      const nextTarget = event.relatedTarget;
      const currentTarget = event.currentTarget;
      if (nextTarget && currentTarget instanceof Node && currentTarget.contains(nextTarget)) {
        return;
      }
      setIsCursorInteractive(false);
    };

    document.body.classList.add('custom-cursor-enabled');
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseover', handlePointerOver);
    document.addEventListener('mouseout', handlePointerOut);

    return () => {
      window.clearInterval(interval);
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
    };
  }, [frames.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div
        className={`custom-cursor ${isCursorInteractive ? 'is-interactive' : ''} ${isCursorPressed ? 'is-pressed' : ''}`}
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
      />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
        <section className="grid items-center gap-8 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-glow backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900">
              <img
                src={frames[currentFrame]}
                alt="2D animation showcase"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between px-1">
              <div>
                <p className="text-sm font-semibold text-white">2D Animation Showcase</p>
                <p className="text-sm text-slate-400">Frame-based sequence playback</p>
              </div>
              <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
                {currentFrame + 1}/{frames.length}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
              Available for freelance & brand collaborations
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Darshna Khatri
              </h1>
              <p className="text-xl font-medium text-cyan-300 sm:text-2xl">
                WordPress Developer & AI Ads Creator
              </p>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Passionate WordPress developer with a creative edge in AI advertisement production. I specialize in crafting seamless user experiences and high-converting visual content for brands. Dedicated to delivering professional, modern, and performance-optimized websites.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">What I Do</p>
            <div className="mt-5 space-y-3">
              {services.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Featured Work</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <h3 className="mb-3 text-lg font-semibold text-white">Websites</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {websites.map((site) => (
                    <li key={site} className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
                      {site}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <h3 className="mb-3 text-lg font-semibold text-white">AI Ads</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {aiAds.map((ad) => (
                    <li key={ad} className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
                      {ad}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Projects</p>
            </div>
          </div>

          <DynamicTechStack />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...websites, ...aiAds].map((project, index) => {
              const isWebsite = index < websites.length;
              if (project === 'Home Service') {
                return (
                  <div
                    key={project}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:-translate-y-1 hover:border-cyan-500/40"
                  >
                    <div className="mb-4 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-slate-950">
                      <img src={homeImg} alt="Home Service mockup" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Website</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      A responsive home services website built for clear service presentation and strong local engagement.
                    </p>
                    <ul className="mt-3 list-inside list-disc space-y-1 text-xs text-white">
                      <li>HTML, CSS, JavaScript</li>
                      <li>PHP backend</li>
                    </ul>
                    <a
                      href="https://658858ce3098fa4ab4d5c042--bespoke-alfajores-575d79.netlify.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-cyan-300 underline"
                    >
                      View project
                    </a>
                  </div>
                );
              }

              if (project === 'Glam Crockery') {
                return (
                  <div
                    key={project}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:-translate-y-1 hover:border-cyan-500/40"
                  >
                    <div className="mb-4 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 via-slate-800 to-slate-950">
                      <img src={glamImg} alt="Glam Crockery mockup" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Website</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      A polished digital experience tailored for brand growth and conversion.
                    </p>
                    <ul className="mt-3 text-white text-xs list-disc list-inside space-y-1">
                      <li>Built with Shopify</li>
                      <li>Custom Liquid Development</li>
                    </ul>
                    <a
                      href="https://darshna-liquid-store.myshopify.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-cyan-300 text-sm underline"
                    >
                      View project
                    </a>
                  </div>
                );
              }

              if (project === 'Glow & Spa Salon') {
                return (
                  <div
                    key={project}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:-translate-y-1 hover:border-cyan-500/40"
                  >
                    <div className="mb-4 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-slate-950">
                      <img src={glowImg} alt="Glow & Spa mockup" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Website</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      A polished salon website crafted for bookings, retail, and a stronger local online presence.
                    </p>
                    <ul className="mt-3 list-inside list-disc space-y-1 text-xs text-white">
                      <li>Booking system integrated</li>
                      <li>E-commerce ready</li>
                      <li>10+ custom pages</li>
                      <li>Fully responsive design</li>
                    </ul>
                    <div className="mt-3 text-sm text-slate-300">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Built with</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                          WordPress
                        </span>
                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                          Elementor
                        </span>
                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                          WooCommerce
                        </span>
                      </div>
                    </div>
                    <a
                      href="https://dev-glowwwspasalon.pantheonsite.io/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-cyan-300 underline"
                    >
                      View project
                    </a>
                  </div>
                );
              }

              if (project === 'Dream Destination') {
                return (
                  <div
                    key={project}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:-translate-y-1 hover:border-cyan-500/40"
                  >
                    <div className="mb-4 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-slate-950">
                      <img src={dreamImg} alt="Dream Destination mockup" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Website</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      A visually appealing travel website focused on destination storytelling and smooth browsing experience.
                    </p>
                    <ul className="mt-3 list-inside list-disc space-y-1 text-xs text-white">
                      <li>HTML</li>
                      <li>CSS</li>
                      <li>JavaScript</li>
                    </ul>
                    <a
                      href="https://dream-destination-flame.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-cyan-300 underline"
                    >
                      View project
                    </a>
                  </div>
                );
              }

              if (project === 'Model Clothing Ad') {
                return (
                  <div
                    key={project}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:-translate-y-1 hover:border-cyan-500/40"
                  >
                    <div className="mb-4 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-slate-950">
                      <video
                        src={modelClothingVideo}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">AI Ad</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      A fashion-focused promotional video designed for social media impact and brand appeal.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                        Video Ad
                      </span>
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                        Social Media
                      </span>
                    </div>
                    <a
                      href={adInstagramLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-cyan-300 underline"
                    >
                      View Ad
                    </a>
                  </div>
                );
              }

              if (project === 'Restaurant Ad') {
                return (
                  <div
                    key={project}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:-translate-y-1 hover:border-cyan-500/40"
                  >
                    <div className="mb-4 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-slate-950">
                      <video
                        src={restaurantVideo}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">AI Ad</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      A restaurant-focused promotional video designed to attract attention and drive engagement.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                        Video Ad
                      </span>
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                        Food Brand
                      </span>
                    </div>
                    <a
                      href={adInstagramLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-cyan-300 underline"
                    >
                      View Ad
                    </a>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </section>

        <section id="contact" className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Let’s build a standout digital presence</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <a href="mailto:khatridarshna80@gmail.com" className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition hover:border-cyan-400 hover:text-cyan-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z"/><path strokeLinecap="round" strokeLinejoin="round" d="m4 8 8 6 8-6"/></svg>
                  <span>khatridarshna80@gmail.com</span>
                </a>
                <a href="tel:+923131399053" className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition hover:border-cyan-400 hover:text-cyan-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M5 4h4l2 5-2.5 1.5a14 14 0 0 0 6.5 6.5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>
                  <span>0313 1399053</span>
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Karachi, Pakistan</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/darshnacodes"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56v-2.18c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.instagram.com/web.ads.creator?igsh=MTh5MGdicW8xb2R6MA=="
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-3.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/darshna-khatri/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12ZM5.5 9.5h2.88V19H5.5Zm4.7 0h2.76v1.3h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.91 3.45 4.4V19h-2.88v-8.35c0-1.99-.04-4.55-2.77-4.55-2.78 0-3.2 2.17-3.2 4.4V19H10.2Z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
