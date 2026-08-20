import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';

import SkipLink from './components/SkipLink';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

import SermonsList from './pages/sermons/SermonsList';
import SermonDetail from './pages/sermons/SermonDetail';
import SermonForm from './pages/sermons/SermonForm';

import ArticlesList from './pages/articles/ArticlesList';
import ArticleDetail from './pages/articles/ArticleDetail';
import ArticleForm from './pages/articles/ArticleForm';

import BooksList from './pages/books/BooksList';
import BookDetail from './pages/books/BookDetail';
import BookForm from './pages/books/BookForm';
import ReadBook from './pages/books/ReadBook';

import MembersFeed from './members/MembersFeed';
import MemberPostForm from './members/MemberPostForm';

import MembershipRequests from './pages/admin/MembershipRequests';


function AppShell() {
  const { loadingUser } = useAuth();

  // Brief, deliberate: better than routes flashing a "not signed in" state
  // for a moment before the stored token finishes verifying against the
  // server (see AuthContext.jsx).
  if (loadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading…
      </div>
    );
  }

  return (
    <ContentProvider>
      <BrowserRouter>
        <SkipLink />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/sermons" element={<SermonsList />} />
              <Route path="/sermons/new" element={<ProtectedRoute role="admin"><SermonForm mode="create" /></ProtectedRoute>} />
              <Route path="/sermons/:id" element={<SermonDetail />} />
              <Route path="/sermons/:id/edit" element={<ProtectedRoute role="admin"><SermonForm mode="update" /></ProtectedRoute>} />

              <Route path="/articles" element={<ArticlesList />} />
              <Route path="/articles/new" element={<ProtectedRoute role="admin"><ArticleForm mode="create" /></ProtectedRoute>} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/articles/:id/edit" element={<ProtectedRoute role="admin"><ArticleForm mode="update" /></ProtectedRoute>} />

              <Route path="/books" element={<BooksList />} />
              <Route path="/books/new" element={<ProtectedRoute role="admin"><BookForm mode="create" /></ProtectedRoute>} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/books/:id/edit" element={<ProtectedRoute role="admin"><BookForm mode="update" /></ProtectedRoute>} />
              <Route path="/books/:id/read" element={<ReadBook />} />

              <Route path="/members" element={<ProtectedRoute role="member"><MembersFeed /></ProtectedRoute>} />
              <Route path="/members/new" element={<ProtectedRoute role="admin"><MemberPostForm mode="create" /></ProtectedRoute>} />
              <Route path="/members/:id/edit" element={<ProtectedRoute role="admin"><MemberPostForm mode="update" /></ProtectedRoute>} />

              <Route path="/admin/members" element={<ProtectedRoute role="admin"><MembershipRequests /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ContentProvider>
  );
}

// localStorage.clear()

console.log(localStorage)

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
