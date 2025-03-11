import express from 'express';
const router = express.Router();

const songs =  { id: 1, title: 'Song 1', artist: 'Artist 1' };

router.get('/', (req, res) => {
  res.json(songs);
});

export default router;