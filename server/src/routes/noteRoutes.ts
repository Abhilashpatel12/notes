import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Apply the protect middleware to all routes in this file
router.use(protect);

router.route('/').get(getNotes).post(createNote);
router.route('/:id').delete(deleteNote);

export default router;
