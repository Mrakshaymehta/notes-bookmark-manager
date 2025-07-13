'use client';

import { useState, useEffect } from 'react';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const [query, setQuery] = useState('');
  const [filterTags, setFilterTags] = useState('');

  // Fetch filtered bookmarks
  useEffect(() => {
    const url = new URL('http://localhost:5000/api/bookmarks');
    if (query) url.searchParams.append('q', query);
    if (filterTags) url.searchParams.append('tags', filterTags);

    fetch(url.toString())
      .then(res => res.json())
      .then(data => setBookmarks(data));
  }, [query, filterTags]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBookmark = {
      url,
      title,
      description,
      tags: tags.split(',').map(t => t.trim()),
    };

    const res = await fetch('http://localhost:5000/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBookmark),
    });

    const data = await res.json();
    setBookmarks(prev => [...prev, data]);
    setUrl('');
    setTitle('');
    setDescription('');
    setTags('');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🔖 Bookmarks</h1>

      {/* Filters */}
      <div className="mb-6 space-y-2">
        <input
          className="w-full p-2 border rounded"
          placeholder="Search by text..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Filter by tags (comma separated)..."
          value={filterTags}
          onChange={e => setFilterTags(e.target.value)}
        />
      </div>
      <div className="space-y-4">
  {notes.length > 0 ? (
    notes.map(note => (
      <div key={note.id} className="p-4 border rounded shadow relative">
        <button
          onClick={async () => {
            await fetch(`http://localhost:5000/api/notes/${note.id}/favorite`, {
              method: 'PATCH'
            });
            setNotes(prev =>
              prev.map(n => n.id === note.id ? { ...n, favorite: !n.favorite } : n)
            );
          }}
          className="absolute top-2 right-2 text-yellow-500 text-xl"
          title="Toggle Favorite"
        >
          {note.favorite ? '★' : '☆'}
        </button>

        <h2 className="text-xl font-semibold">{note.title}</h2>
        <p>{note.content}</p>
        <div className="text-sm text-gray-600 mt-2">
          Tags: {note.tags?.join(', ')}
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 italic">No notes found.</p>
  )}
</div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Title (optional)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Bookmark
        </button>
      </form>

      {/* Bookmarks */}
      <div className="space-y-4">
        {bookmarks.length > 0 ? (
          bookmarks.map(bookmark => (
            <div key={bookmark.id} className="p-4 border rounded shadow">
              <a href={bookmark.url} className="text-lg font-semibold text-blue-600 hover:underline" target="_blank">
                {bookmark.title || '(No Title)'}
              </a>
              <p>{bookmark.description}</p>
              <div className="text-sm text-gray-600 mt-2">
                Tags: {bookmark.tags?.join(', ')}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No bookmarks found.</p>
        )}
      </div>
    </div>
  );
}
