import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import leadership from '../data/leadership';

const SECTIONS = [
  { id: 'mission', label: 'Mission' },
  { id: 'history', label: 'History' },
  { id: 'doctrine', label: 'Doctrine' },
  { id: 'leadership', label: 'Leadership' },
];

export default function About() {
  return (
    <div>
      <Helmet><title>About · Soddo Baptist Church</title></Helmet>

      {/* Hero */}
      <section
        className="relative flex min-h-105 items-end bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543429257-6ac2fda07f61?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative mx-auto max-w-content w-full px-5 sm:px-8 pb-14">
          <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">
            Wolaita Soddo, Ethiopia
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            Welcome to <span className="italic font-semibold">Soddo Baptist</span> Church
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            A reformed Baptist congregation, gathered around the Word since 2018.
          </p>
        </div>
      </section>

      {/* Quick-jump section nav */}
      <nav
        aria-label="About sections"
        className="sticky top-16 z-30 border-b border-border bg-paper/95 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-content px-5 sm:px-8 flex gap-2 overflow-x-auto no-scrollbar py-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mission */}
      <Section id="mission" eyebrow="Why we gather" title="Our Mission">
        <p className="text-lg text-ink/80 leading-relaxed max-w-2xl">
          Our mission is to worship God through Jesus Christ in the Spirit and truth with
          fellow believers, to share the Gospel with the world, and to equip believers for
          ministry.
        </p>
      </Section>

      {/* History */}
      <Section id="history" eyebrow="Where we came from" title="Our History" alt>
        <p className="text-ink/80 leading-relaxed max-w-2xl mb-4">
          Soddo Baptist Church is a reformed Baptist congregation in Wolaita Soddo,
          subscribing to the 1689 London Baptist Confession of Faith. We began gathering in
          2018 and have since grown to a congregation of nearly 70 members, many of them
          university and high school students.
        </p>
        <p className="text-ink/80 leading-relaxed max-w-2xl">
          What began as a small group willing to ask hard questions about faith and practice
          has grown, by God's grace, into a church family that gathers weekly to worship,
          study, and care for one another.
        </p>
      </Section>

      {/* Doctrine */}
      <Section id="doctrine" eyebrow="What we believe" title="Doctrinal Statement">
        <p className="text-ink/80 leading-relaxed max-w-2xl">
          We stand on the five Solas of the Reformation and celebrate the work of Christ
          through two ordinances — Baptism and the Lord's Supper — which we observe most
          Sundays.
        </p>
      </Section>

      {/* Leadership */}
      <Section id="leadership" eyebrow="Who leads us" title="Leadership" alt>
        <div className="grid gap-6 sm:grid-cols-3 max-w-3xl">
          {leadership.map((person) => (
            <div key={person.name} className="text-center">
              <img
                src={person.photo}
                alt=""
                className="mx-auto h-32 w-32 rounded-full object-cover ring-1 ring-black/5"
              />
              <p className="mt-4 font-bold text-ink">{person.name}</p>
              <p className="text-sm text-muted">{person.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 text-center">
          <h2 className="text-3xl font-extrabold mb-3">Join us this Sunday</h2>
          <p className="text-white/70 mb-6">9:00 AM, every Sunday — everyone is welcome.</p>
          <Link
            to="/contact"
            className="inline-block rounded-md bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
          >
            Get Directions
          </Link>
        </div>
      </section>
    </div>
  );
}

function Section({ id, eyebrow, title, alt, children }) {
  return (
    <section id={id} className={`scroll-mt-32 ${alt ? 'bg-paper-2' : 'bg-paper'}`}>
      <div className="mx-auto max-w-content px-5 sm:px-8 py-16">
        <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-2">{eyebrow}</p>
        <h2 className="text-3xl font-extrabold text-ink mb-6">{title}</h2>
        {children}
      </div>
    </section>
  );
}
