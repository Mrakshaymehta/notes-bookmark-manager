let bookmarks = []; // In-memory storage
let id = 1;

// CREATE
exports.createBookmark = (req, res) => {
  const { url, title, description, tags } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const newBookmark = {
    id: id++,
    url,
    title: title || "(No title)",
    description,
    tags: tags || []
  };

  bookmarks.push(newBookmark);
  res.status(201).json(newBookmark);
};

// READ ALL
exports.getAllBookmarks = (req, res) => {
  res.json(bookmarks);
};

// READ ONE
exports.getBookmarkById = (req, res) => {
  const bookmark = bookmarks.find(b => b.id === parseInt(req.params.id));
  if (!bookmark) return res.status(404).json({ error: "Bookmark not found" });
  res.json(bookmark);
};

// UPDATE
exports.updateBookmark = (req, res) => {
  const bookmark = bookmarks.find(b => b.id === parseInt(req.params.id));
  if (!bookmark) return res.status(404).json({ error: "Bookmark not found" });

  const { url, title, description, tags } = req.body;
  if (url !== undefined) bookmark.url = url;
  if (title !== undefined) bookmark.title = title;
  if (description !== undefined) bookmark.description = description;
  if (tags !== undefined) bookmark.tags = tags;

  res.json(bookmark);
};

// DELETE
exports.deleteBookmark = (req, res) => {
  const index = bookmarks.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Bookmark not found" });

  const deleted = bookmarks.splice(index, 1);
  res.json({ message: "Bookmark deleted", deleted });
};
exports.getAllBookmarks = (req, res) => {
  const { q, tags } = req.query;
  let filtered = bookmarks;

  if (q) {
    filtered = filtered.filter(b =>
      b.url.toLowerCase().includes(q.toLowerCase()) ||
      b.title?.toLowerCase().includes(q.toLowerCase()) ||
      b.description?.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (tags) {
    const tagArray = tags.split(',').map(t => t.trim());
    filtered = filtered.filter(b =>
      b.tags.some(tag => tagArray.includes(tag))
    );
  }

  res.json(filtered);
};