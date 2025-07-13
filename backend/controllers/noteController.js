let notes = [];
let id = 1;

// CREATE a note
exports.createNote = (req, res) => {
  const { title, content, tags } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newNote = {
    id: id++,
    title,
    content,
    tags: tags || [],
    favorite: false
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

// READ all notes (with optional filters)
exports.getAllNotes = (req, res) => {
  const { q, tags } = req.query;
  let filtered = notes;

  if (q) {
    filtered = filtered.filter(note =>
      note.title.toLowerCase().includes(q.toLowerCase()) ||
      note.content?.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (tags) {
    const tagArray = tags.split(',').map(t => t.trim());
    filtered = filtered.filter(note =>
      note.tags.some(tag => tagArray.includes(tag))
    );
  }

  res.json(filtered);
};

// READ one note
exports.getNoteById = (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
};

// UPDATE a note
exports.updateNote = (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ error: "Note not found" });

  const { title, content, tags } = req.body;
  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;
  if (tags !== undefined) note.tags = tags;

  res.json(note);
};

// DELETE a note
exports.deleteNote = (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Note not found" });

  const deleted = notes.splice(index, 1);
  res.json({ message: "Note deleted", deleted });
};

// TOGGLE favorite
exports.toggleFavorite = (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ error: "Note not found" });

  note.favorite = !note.favorite;
  res.json({ id: note.id, favorite: note.favorite });
};