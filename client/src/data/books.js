// readUrl / downloadUrl are separate on purpose — "read in browser" and
// "download the file" are different actions with different UX, and
// sometimes only one is available (see below).
export const BOOK_UNAVAILABLE = null;

const books = [
  {
    id: 'b1',
    title: '12 Ways Your Phone Is Changing You',
    author: 'Tony Reinke',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    overview:
      'Within a few years of its unveiling, the smartphone became fully integrated into the daily patterns of our lives — for better and worse.',
    // Still under copyright — no legal free copy to link to. Replace with
    // your own licensed file/link when you have distribution rights.
    readUrl: BOOK_UNAVAILABLE,
    downloadUrl: BOOK_UNAVAILABLE,
  },
  {
    id: 'b2',
    title: 'Knowing God',
    author: 'J. I. Packer',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    overview: 'A classic study on what it means to actually know God, not merely know about him.',
    // Still under copyright — same as above.
    readUrl: BOOK_UNAVAILABLE,
    downloadUrl: BOOK_UNAVAILABLE,
  },
  {
    id: 'b3',
    title: 'The Pilgrim\u2019s Progress',
    author: 'John Bunyan',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80',
    overview: 'An allegory of the Christian life as a journey from the City of Destruction to the Celestial City.',
    // Public domain (published 1678) — real links via Project Gutenberg.
    readUrl: 'https://www.gutenberg.org/cache/epub/131/pg131-images.html',
    downloadUrl: 'https://www.gutenberg.org/ebooks/131.txt.utf-8',
  },
];

export default books;
