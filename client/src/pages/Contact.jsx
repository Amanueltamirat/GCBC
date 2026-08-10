import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin } from 'lucide-react';

const MAP_QUERY = '6.853674088660931,37.75918312394459';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit — wire to a real endpoint once the backend exists.
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-16">
      <Helmet><title>Contact · Soddo Baptist Church</title></Helmet>
      <h1 className="text-4xl font-extrabold text-ink mb-8">Contact Us</h1>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <ul className="flex flex-col gap-4 mb-8">
            <li className="flex items-center gap-3 text-ink">
              <Phone className="text-accent" size={20} /> +251 92 888 4393
            </li>
            <li className="flex items-center gap-3 text-ink">
              <Mail className="text-accent" size={20} /> Perfecttesfa456@gmail.com
            </li>
            <li className="flex items-center gap-3 text-ink">
              <MapPin className="text-accent" size={20} /> Wolaita Soddo, Ethiopia
            </li>
          </ul>

          <div className="aspect-video rounded-lg overflow-hidden border border-border">
            <iframe
              title="Soddo Baptist Church location"
              className="h-full w-full"
              loading="lazy"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
            />
          </div>
        </div>

        <div>
          {submitted ? (
            <div role="status" className="rounded-lg bg-paper-2 border border-border p-6">
              <p className="font-semibold text-ink">Thank you — your message has been sent.</p>
              <p className="text-sm text-muted mt-1">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">Name</label>
                <input id="name" name="name" required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">Email</label>
                <input id="email" name="email" type="email" required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-1">Message</label>
                <textarea id="message" name="message" rows={5} required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
              </div>
              <button type="submit" className="self-start rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
