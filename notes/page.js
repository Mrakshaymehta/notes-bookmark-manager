'use client';

import { useState, useEffect } from 'react';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [query, setQuery] = useState('');
  const [filterTags, setFilterTags] = useState('');

  // Fetch notes based on filters
  useEffect(() => {
    const url = new URL('http://localhost:5000/api/notes');
    if (query) url.searchParams.append('q', query);
    if (filterTags) url.searchParams.append('tags', filterTags);

    fetch(url.toString())
      .then(res => res.json())
      .then(data => setNotes(data));
  }, [query, filterTags]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      tags: tags.split(',').map(t => t.trim()),
    };

    const res = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    });

    const data = await res.json();
    setNotes(prev => [...prev, data]);
    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📝 Notes</h1>

      {/* Filter Inputs */}
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

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Note
        </button>
      </form>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map(note => (
            <div key={note.id} className="p-4 border rounded shadow">
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
    </div>
  );
}