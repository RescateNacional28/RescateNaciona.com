const db = require('../db'); // Asegúrate que esta es tu conexión a MySQL

exports.getAllPosts = (req, res) => {
  const sql = 'SELECT title, content, media, created_at FROM posts ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener noticias:', err);
      return res.status(500).json({ error: 'Error al obtener noticias' });
    }

    const posts = results.map(post => ({
      ...post,
      media: post.media ? `/uploads/${post.media}` : null,
      created_at: new Date(post.created_at).toLocaleDateString('es-ES') // Formato de fecha en español
    }));

    res.json(posts);
  });
};


exports.createPost = (req, res) => {
  const { title } = req.body;
  const content = req.body.content;
  const media = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO posts (title, content, media) VALUES (?, ?, ?)';
  db.query(sql, [title, content, media], (err, result) => {
    if (err) {
      console.error('Error al crear la noticia:', err);
      return res.status(500).json({ error: 'Error al guardar la noticia' });
    }

    res.status(201).json({ message: 'Noticia creada correctamente' });
  });
};


