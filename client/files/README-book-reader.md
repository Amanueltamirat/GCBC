# Read Online + Download for Books

## Files
```
src/data/books.js               → replaces existing — readUrl/downloadUrl instead of fileUrl
src/pages/books/ReadBook.jsx    → new — the in-browser reader
src/pages/books/BookDetail.jsx  → replaces existing — two buttons instead of one
src/pages/books/BookForm.jsx    → replaces existing — two URL fields instead of one
src/App.jsx                     → replaces existing — adds /books/:id/read
```

## Why only one of your three mock books actually works
"12 Ways Your Phone Is Changing You" and "Knowing God" are both still under
copyright — there's no legal free full text to link to, so I left their
`readUrl`/`downloadUrl` as `null` rather than pointing at a pirated copy
somewhere. The UI handles this honestly: both buttons render as visibly
disabled with a "not available yet" tooltip instead of silently doing
nothing or linking somewhere it shouldn't.

**"The Pilgrim's Progress" is real and fully functional** — it's public
domain (published 1678), and both URLs are genuine Project Gutenberg links
I verified before using:
- Read Online → Gutenberg's own embeddable HTML reading page
- Download → Gutenberg's plain-text file

Worth knowing: Gutenberg doesn't actually publish a PDF for this title —
only EPUB, Kindle, HTML, and plain text. `ReadBook.jsx` is built to embed
either a PDF or an HTML page in the iframe, so this works either way; when
you eventually add your own PDF-based titles, no code changes needed.

## The "Download" button and cross-origin files
A plain `<a href download>` only reliably forces a save dialog for
same-origin files. For links pointing at another domain (like Gutenberg,
or wherever you eventually host real PDFs), the browser's behavior depends
on how that server responds — Gutenberg's download endpoints are built to
trigger a save prompt on their end, which is why this works without the
`download` attribute doing any extra work. If you self-host PDFs later,
make sure your server sends a `Content-Disposition: attachment` header for
true one-click downloads, rather than relying on the browser to guess.

## When you're ready to add real, licensed content
For the two copyrighted titles, once you either purchase distribution
rights or get publisher permission for congregational use, just fill in
real `readUrl`/`downloadUrl` values in `books.js` (or through the admin
form — same two fields) — nothing else changes.
