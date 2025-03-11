import express from 'express';
const router = express.Router();

const songs = [
  { id: 1, title: 'hard', artist: 'Artist 1' , src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
  { id: 2, title: 'Song 2', artist: 'Artist 2' },
  { id: 3, title: 'Song 3', artist: 'Artist 3' },
];

router.get('/', (req, res) => {
  res.json(songs);
});
// GET /api/songs/search?title=Song 1 - Get songs by title
router.get('/search', (req, res) => {
    const { title } = req.query; // Get the title from the query parameters
    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }
  
    const filteredSongs = songs.filter(song =>
      song.title.toLowerCase().includes(title.toLowerCase()) // Case-insensitive search
    );
  
    res.json(filteredSongs);
  });
  
  router.post('/', (req, res) => {
      const newSong = req.body;
      songs.push(newSong);
      res.status(201).json(newSong);
  });
  
  export default router;