import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const base = import.meta.env.BASE_URL;

const rooms = [
  {
    name: 'The Courtyard Suite',
    detail: 'A private terrace, poured stone floors, linen drapery, and morning light that moves slowly across the room.',
    image: `${base}images/suite.jpg`,
  },
  {
    name: 'The Sea Room',
    detail: 'A quieter corner of the house with a restrained palette, a shaded sitting niche, and a direct view to the horizon.',
    image: `${base}images/hero.jpg`,
  },
  {
    name: 'The Shade Loft',
    detail: 'Textured plaster, a deep bath, and a compact plan that feels more like a coastal residence than a hotel room.',
    image: `${base}images/atmosphere.jpg`,
  },
];

const motionConfig = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

function SectionLabel({ children }) {
  return <p className="eyebrow mb-4">{children}</p>;
}

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...motionConfig, delay }}
    >
      {children}
    </motion.div>
  );
}

function RoomCard({ room, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`grid gap-4 md:gap-8 items-center ${index % 2 === 1 ? 'md:grid-cols-[0.95fr_1.05fr]' : 'md:grid-cols-[1.05fr_0.95fr]'}`}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...motionConfig, delay: index * 0.05 }}
    >
      <div className={index % 2 === 1 ? 'md:order-2' : ''}>
        <p className="eyebrow mb-3">0{index + 1}</p>
        <h3 className="display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-lume-ink">{room.name}</h3>
        <p className="mt-5 max-w-lg text-sm sm:text-[15px] leading-7 text-lume-ink/78">{room.detail}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lume-ink/85">
          <span className="h-px w-10 bg-lume-clay/60" />
          View suite details
        </div>
      </div>

      <div className={`relative overflow-hidden rounded-[2rem] shadow-soft ${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <img
          src={room.image}
          alt={room.name}
          className="h-[28rem] w-full object-cover md:h-[34rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-black/0 to-transparent" />
      </div>
    </motion.article>
  );
}

function PressLine({ children }) {
  return (
    <div className="border-y border-lume-ink/10 py-6 sm:py-8 text-center">
      <p className="text-sm sm:text-base text-lume-ink/76 italic">{children}</p>
    </div>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, reduce ? 0 : 70]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, reduce ? 1 : 1.05]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe6_0%,#f3eadf_42%,#efe3d6_100%)] text-lume-ink">
      <header id="top" className="absolute left-0 right-0 top-0 z-20">
        <div className="section-shell flex items-center justify-between py-6 sm:py-8 text-sm">
          <div className="font-medium tracking-[0.22em] uppercase text-lume-ink/70">Casa Lume</div>
          <nav className="hidden md:flex items-center gap-8 text-lume-ink/72">
            <a href="#suites">Suites</a>
            <a href="#experience">Experience</a>
            <a href="#booking">Book</a>
          </nav>
          <a href="#booking" className="rounded-full border border-lume-ink/15 bg-white/40 px-4 py-2 backdrop-blur-sm transition hover:bg-white/60">
            Check availability
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img src={`${base}images/hero.jpg`} alt="Casa Lume terrace" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,244,230,0.34),transparent_38%),linear-gradient(180deg,rgba(43,30,20,0.25),rgba(43,30,20,0.45))]" />
        </motion.div>

        <div className="relative section-shell min-h-[100svh] flex items-end py-28 sm:py-32 lg:py-28">
          <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <Reveal className="max-w-3xl text-white">
              <p className="eyebrow mb-5 text-white/70">Mediterranean boutique stay</p>
              <h1 className="display text-[4.4rem] sm:text-[6rem] lg:text-[7.8rem] leading-[0.86] tracking-[-0.04em]">
                Quiet light,
                <br />
                warm stone,
                <br />
                slow days.
              </h1>
              <p className="mt-6 max-w-xl text-sm sm:text-base leading-7 text-white/82">
                Casa Lume is a coastal house of rooms, terraces, and shaded corners, shaped for guests who prefer calm to spectacle.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#booking" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-lume-ink transition hover:bg-lume-chalk">
                  Reserve a stay
                </a>
                <a href="#suites" className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/10">
                  View suites
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:justify-self-end lg:max-w-sm">
              <div className="rounded-[1.75rem] border border-white/18 bg-white/12 p-5 text-white backdrop-blur-md shadow-soft">
                <p className="eyebrow mb-3 text-white/70">At a glance</p>
                <ul className="space-y-3 text-sm leading-6 text-white/86">
                  <li>12 rooms and suites</li>
                  <li>Sea-facing courtyard dining</li>
                  <li>Stone terraces and private corners</li>
                  <li>Concierge, transfers, and daily breakfast</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell py-20 sm:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <Reveal>
            <SectionLabel>About Casa Lume</SectionLabel>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-xl">
              A house tuned to light, texture, and a quieter kind of luxury.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-6 sm:grid-cols-2">
              <p className="text-sm sm:text-[15px] leading-7 text-lume-ink/78 max-w-md">
                Set into a soft coastline, Casa Lume pairs pale stone, linen, shaded paths, and rooms that open toward the sea without feeling exposed to it.
              </p>
              <p className="text-sm sm:text-[15px] leading-7 text-lume-ink/78 max-w-md">
                Everything is edited down to the useful and the beautiful, so the experience stays intimate, calm, and distinctly Mediterranean.
              </p>
            </div>
            <div className="mt-8 flex gap-8 border-t border-lume-ink/10 pt-6 text-sm text-lume-ink/70">
              <div>
                <div className="display text-4xl text-lume-ink">12</div>
                <div className="mt-1">rooms</div>
              </div>
              <div>
                <div className="display text-4xl text-lume-ink">1</div>
                <div className="mt-1">private courtyard</div>
              </div>
              <div>
                <div className="display text-4xl text-lume-ink">∞</div>
                <div className="mt-1">slow mornings</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="suites" className="section-shell py-16 sm:py-24 lg:py-28">
        <Reveal>
          <SectionLabel>Featured suites</SectionLabel>
          <div className="grid gap-4 sm:gap-6">
            {rooms.map((room, index) => (
              <RoomCard key={room.name} room={room} index={index} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0">
          <img src={`${base}images/atmosphere.jpg`} alt="Casa Lume stair and curtain" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,18,14,0.48),rgba(24,18,14,0.12)_52%,rgba(24,18,14,0.38))]" />
        </div>
        <div className="relative section-shell min-h-[34rem] flex items-end">
          <Reveal className="max-w-xl pb-4 text-white">
            <SectionLabel>
              <span className="text-white/70">Atmosphere</span>
            </SectionLabel>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              Corridors of stone, shade, and filtered coastal air.
            </h2>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="section-shell py-20 sm:py-28 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
              <img src={`${base}images/dining.jpg`} alt="Casa Lume dining table" className="h-[32rem] w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionLabel>Dining & experience</SectionLabel>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-xl">
              A table under stone arches, built around long lunches and slower evenings.
            </h2>
            <p className="mt-6 max-w-xl text-sm sm:text-[15px] leading-7 text-lume-ink/76">
              Breakfast arrives with citrus, honey, and warm bread. At dusk, the menu turns toward grilled vegetables, coastal seafood, and wines chosen for heat, salt, and time.
            </p>
            <div className="mt-8 border-l border-lume-clay/35 pl-5 text-sm leading-6 text-lume-ink/74">
              Private dining on request, aperitivo on the terrace, and a small kitchen that understands restraint.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24 lg:py-28">
        <Reveal>
          <SectionLabel>Editorial note</SectionLabel>
          <div className="max-w-4xl">
            <h2 className="display text-4xl sm:text-5xl lg:text-7xl leading-[0.92] tracking-[-0.03em]">
              The house is not trying to impress you. It is trying to slow you down.
            </h2>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-8 sm:pb-12 lg:pb-16">
        <PressLine>Featured in Coastal House Journal, Room & Ritual, and The Mediterranean Edit</PressLine>
      </section>

      <section id="booking" className="section-shell py-16 sm:py-24 lg:py-28">
        <div className="grid gap-8 rounded-[2.25rem] border border-lume-ink/10 bg-white/55 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10 backdrop-blur-sm shadow-soft">
          <Reveal>
            <SectionLabel>Book a stay</SectionLabel>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-xl">
              Choose a room, then leave the rest of the day open.
            </h2>
            <p className="mt-5 max-w-lg text-sm sm:text-[15px] leading-7 text-lume-ink/76">
              Book directly for the best room selection, priority arrival times, and a quiet welcome from the team.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <form className="grid gap-3 rounded-[1.5rem] bg-lume-chalk/80 p-4 sm:p-5">
              <label className="grid gap-2 text-sm font-medium">
                Arrival
                <input type="date" className="rounded-2xl border border-lume-ink/10 bg-white px-4 py-3 outline-none focus:border-lume-olive" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Departure
                <input type="date" className="rounded-2xl border border-lume-ink/10 bg-white px-4 py-3 outline-none focus:border-lume-olive" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Guests
                <select className="rounded-2xl border border-lume-ink/10 bg-white px-4 py-3 outline-none focus:border-lume-olive">
                  <option>2 guests</option>
                  <option>1 guest</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                </select>
              </label>
              <button type="button" className="mt-2 rounded-full bg-lume-ink px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-lume-olive">
                Check availability
              </button>
              <p className="text-xs leading-5 text-lume-ink/58">Direct bookings include breakfast and complimentary airport transfer on select stays.</p>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="section-shell pb-10 sm:pb-14 lg:pb-16">
        <div className="flex flex-col gap-4 border-t border-lume-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between text-sm text-lume-ink/68">
          <div>Casa Lume, Mediterranean boutique hotel</div>
          <div className="flex items-center gap-6">
            <a href="#top">Top</a>
            <a href="#booking">Booking</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
