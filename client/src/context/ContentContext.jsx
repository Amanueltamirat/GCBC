import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

const ContentContext = createContext();



const normalizeComment = (c) => ({ ...c, id: c._id, date: c.createdAt?.slice(0, 10) });
const normalizeItem = (doc) => ({
  ...doc,
  id: doc._id,
  date: doc.createdAt?.slice(0, 10),
  ...(doc.comments ? { comments: doc.comments.map(normalizeComment) } : {}),
});

const ENDPOINTS = {
  sermons: '/sermons',
  articles: '/articles',
  books: '/books',
  memberPosts: '/member-posts',
};

export function ContentProvider({ children }) {
  const { isMember, user } = useAuth();


  const [sermons, setSermons] = useState([]);
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);
  const [memberPosts, setMemberPosts] = useState([]);

  const collections = { sermons, articles, books, memberPosts };
  const setters = { sermons: setSermons, articles: setArticles, books: setBooks, memberPosts: setMemberPosts };


  const refresh = useCallback(async (collection) => {
    try {
      const { data } = await api.get(ENDPOINTS[collection]);
      setters[collection](data.map(normalizeItem));
      // console.log(data)
    } catch (err) {
      // Known gap: no dedicated loading/error UI on the list pages yet
      // (see README) — at minimum, don't leave an unhandled rejection.
      console.error(`Failed to load ${collection}:`, err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { refresh('sermons'); }, [refresh]);
  useEffect(() => { refresh('articles'); }, [refresh]);
  useEffect(() => { refresh('books'); }, [refresh]);
  useEffect(() => {
    // MemberPosts is the one collection that isn't public — only fetch it
    // once we actually know the signed-in user is an approved member.
    if (isMember) refresh('memberPosts');
    else setMemberPosts([]);
  }, [isMember, refresh]);


  const create = async (collection, item) => {
    try {
      const { data } = await api.post(ENDPOINTS[collection], item);
    const normalized = normalizeItem(data);
    setters[collection]((prev) => [normalized, ...prev]);
    console.log(data)
    return normalized;
    } catch (error) {
      console.log(error.message)
    }
  };
  

  const update = async (collection, id, updates) => {
    const { data } = await api.put(`${ENDPOINTS[collection]}/${id}`, updates);
    const normalized = normalizeItem(data);
    setters[collection]((prev) => prev.map((item) => (item.id === id ? normalized : item)));
    return normalized;
  };

  const remove = async (collection, id) => {
    await api.delete(`${ENDPOINTS[collection]}/${id}`);
    setters[collection]((prev) => prev.filter((item) => item.id !== id));
  };

  const getAll = (collection) => collections[collection];
  const getById = (collection, id) => collections[collection].find((item) => item.id === id);


  const toggleLike = async (postId) => {
    const { data } = await api.post(`/member-posts/${postId}/like`);
    setMemberPosts((prev) => prev.map((p) => (p.id === postId ? normalizeItem(data) : p)));
  };

  const addComment = async (postId, { body, parentId = null }) => {
    const { data } = await api.post(`/member-posts/${postId}/comments`, { body, parentId });
    setMemberPosts((prev) => prev.map((p) => (p.id === postId ? normalizeItem(data) : p)));
  };

  const deleteComment = async (postId, commentId) => {
    const { data } = await api.delete(`/member-posts/${postId}/comments/${commentId}`);
    setMemberPosts((prev) => prev.map((p) => (p.id === postId ? normalizeItem(data) : p)));
  };

  return (
    <ContentContext.Provider
      value={{ sermons, articles, books, memberPosts, create, update, remove, getAll, getById, toggleLike, addComment, deleteComment }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
