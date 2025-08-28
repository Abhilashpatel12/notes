import { Request, Response } from 'express';
import Note from '../models/Note';

// @desc    Get all notes for a user
// @route   GET /api/notes
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ userId: req.user?._id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Please provide a title and content' });
  }

  try {
    const note = new Note({
      title,
      content,
      userId: req.user?._id,
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Security check: Make sure the logged-in user owns this note
  if (note.userId.toString() !== String(req.user?._id)) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await note.deleteOne();
    res.status(200).json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
