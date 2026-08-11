import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, CheckCircle2, Navigation } from 'lucide-react';
import socialLinks from '../data/socialLinks';

const MAP_QUERY = '6.853674088660931,37.75918312394459';
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

const CONTACT_ITEMS = [
  { icon: Phone, label: 'Phone', value: '+251 92 888 4393' },
  { icon: Mail, label: 'Email', value: 'Perfecttesfa456@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Wolaita Soddo, Ethiopia' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit — wire to a real endpoint once the backend exists.
    setSubmitted(true);
  };

  return (
    <div>
      <Helmet><title>Contact · Soddo Baptist Church</title></Helmet>

      {/* Hero */}
      <section
        className="relative flex min-h-[320px] items-end bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative mx-auto max-w-content w-full px-5 sm:px-8 pb-12">
          <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">
            We'd love to hear from you
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5">Get in Touch</h1>

          {/* Social icons */}
          <div className="flex gap-3">
            {socialLinks.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Soddo Baptist Church on ${name}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick contact info cards */}
      <section className="mx-auto max-w-content px-5 sm:px-8 -mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-lg bg-paper p-5 shadow-md ring-1 ring-black/5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
                <p className="font-semibold text-ink">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map + form */}
      <section className="mx-auto max-w-content px-5 sm:px-8 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Refined map: grayscale by default, full color on hover/focus,
              with a floating directions card. Plain Google embeds can't be
              recolored without a paid Maps JS API key — this filter-based
              approach gets a deliberate, on-brand look without one. */}
          <div className="relative rounded-lg border border-border overflow-hidden shadow-sm group">
            <div className="aspect-[4/3] sm:aspect-video">
              <iframe
                title="Soddo Baptist Church location"
                className="h-full w-full grayscale contrast-[1.05] group-hover:grayscale-0 group-focus-within:grayscale-0 transition-[filter] duration-500"
                loading="lazy"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
              />
            </div>

            <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs rounded-lg bg-paper/95 backdrop-blur-sm p-4 shadow-lg">
              <p className="font-semibold text-ink text-sm">Soddo Baptist Church</p>
              <p className="text-sm text-muted mt-0.5">Wolaita Soddo, Ethiopia</p>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>

            <div className="p-5 bg-paper-2">
              <p className="font-semibold text-ink">Find us</p>
              <p className="text-sm text-muted">Sundays at 9:00 AM</p>
            </div>
          </div>

          <div className="rounded-lg border border-border p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-ink mb-1">Send a Message</h2>
            <p className="text-muted mb-6">We'll get back to you as soon as we can.</p>

            {submitted ? (
              <div role="status" className="flex items-start gap-3 rounded-lg bg-accent/10 p-5">
                <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-semibold text-ink">Thank you — your message has been sent.</p>
                  <p className="text-sm text-muted mt-1">We'll get back to you soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
