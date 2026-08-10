import React, { createContext, useContext, useReducer } from 'react';
import initialSermons from '../data/sermons';
import initialArticles from '../data/articles';
import initialBooks from '../data/books';
import initialMemberPosts from '../data/memberPosts';

const ContentContext = createContext();

const initialState = {
  sermons: initialSermons,
  articles: initialArticles,
  books: initialBooks,
  memberPosts: initialMemberPosts,
};

function reducer(state, action) {
  const { collection } = action;
  switch (action.type) {
    case 'CREATE':
      return { ...state, [collection]: [action.item, ...state[collection]] };
    case 'UPDATE':
      return {
        ...state,
        [collection]: state[collection].map((item) =>
          item.id === action.id ? { ...item, ...action.updates } : item
        ),
      };
    case 'DELETE':
      return {
        ...state,
        [collection]: state[collection].filter((item) => item.id !== action.id),
      };

    // --- Member post engagement (only memberPosts uses these) ---
    case 'TOGGLE_LIKE':
      return {
        ...state,
        memberPosts: state.memberPosts.map((post) => {
          if (post.id !== action.postId) return post;
          const alreadyLiked = post.likes.includes(action.userEmail);
          return {
            ...post,
            likes: alreadyLiked
              ? post.likes.filter((email) => email !== action.userEmail)
              : [...post.likes, action.userEmail],
          };
        }),
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        memberPosts: state.memberPosts.map((post) =>
          post.id === action.postId
            ? { ...post, comments: [...post.comments, action.comment] }
            : post
        ),
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        memberPosts: state.memberPosts.map((post) =>
          post.id === action.postId
            ? {
                ...post,
                // Deleting a comment also removes its direct replies —
                // this app only supports one level of nesting, so that's
                // the full subtree.
                comments: post.comments.filter(
                  (c) => c.id !== action.commentId && c.parentId !== action.commentId
                ),
              }
            : post
        ),
      };

    default:
      return state;
  }
}

const genId = () => Math.random().toString(36).slice(2, 10);

export function ContentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Generic CRUD, parameterized by collection name
  // ('sermons' | 'articles' | 'books' | 'memberPosts').
  const create = (collection, item) => {
    const withId = { ...item, id: genId(), date: item.date || new Date().toISOString().slice(0, 10) };
    if (collection === 'memberPosts') {
      withId.likes = withId.likes || [];
      withId.comments = withId.comments || [];
    }
    dispatch({ type: 'CREATE', collection, item: withId });
    return withId;
  };
  const update = (collection, id, updates) => dispatch({ type: 'UPDATE', collection, id, updates });
  const remove = (collection, id) => dispatch({ type: 'DELETE', collection, id });
  const getAll = (collection) => state[collection];
  const getById = (collection, id) => state[collection].find((item) => item.id === id);

  // Engagement — any signed-in member, not just admins.
  const toggleLike = (postId, userEmail) => dispatch({ type: 'TOGGLE_LIKE', postId, userEmail });

  const addComment = (postId, { author, authorRole, body, parentId = null }) => {
    const comment = { id: genId(), parentId, author, authorRole, body, date: new Date().toISOString().slice(0, 10) };
    dispatch({ type: 'ADD_COMMENT', postId, comment });
  };

  const deleteComment = (postId, commentId) => dispatch({ type: 'DELETE_COMMENT', postId, commentId });

  return (
    <ContentContext.Provider
      value={{ ...state, create, update, remove, getAll, getById, toggleLike, addComment, deleteComment }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
