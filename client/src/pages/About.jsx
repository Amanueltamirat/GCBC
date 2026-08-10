import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-16">
      <Helmet><title>About · GCBC</title></Helmet>
      <h1 className="text-4xl font-extrabold text-ink mb-8">About Us</h1>

      <div className="grid gap-10 sm:grid-cols-2">
        <section>
          <h2 className="text-xl font-bold text-ink mb-2">Our Mission</h2>
          <p className="text-muted leading-relaxed">
            Our mission is to worship God through Jesus Christ in the Spirit and truth with
            fellow believers, to share the Gospel with the world, and to equip believers for
            ministry.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-ink mb-2">Our History</h2>
          <p className="text-muted leading-relaxed">
            Grace Community Baptist Church is a reformed Baptist congregation in Wolaita Soddo,
            subscribing to the 1689 London Baptist Confession of Faith. We began gathering in
            2018 and have since grown to a congregation of nearly 70 members, many of them
            university and high school students.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-ink mb-2">Doctrinal Statement</h2>
          <p className="text-muted leading-relaxed">
            We stand on the five Solas of the Reformation and celebrate the work of Christ
            through two ordinances — Baptism and the Lord's Supper — which we observe most
            Sundays.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-ink mb-2">Leadership</h2>
          <p className="text-muted leading-relaxed">
            Our elders and preaching team are drawn from within the congregation and trained
            through ongoing theological study and mentorship.
          </p>
        </section>
      </div>
    </div>
  );
}
