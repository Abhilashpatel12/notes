"use client";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { WelcomeCard } from "../components/ui/WelcomeCard";
import { CreateNoteButton } from "../components/ui/CreateNoteButton";
import { NotesList } from "../components/ui/NotesList";
import NoteEditor from "../components/NoteEditor";

interface Note {
  id: number;
  title: string;
  content: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>(() => [
    {
      id: 1,
      title: "Note 1",
      content: "This is a **markdown** note.\n\n- List item 1\n- List item 2",
    },
    {
      id: 2,
      title: "Note 2",
      content: "Another note with _italic_ text.",
    },
  ]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  function deleteNote(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function createNote() {
    setEditingNote(null);
    setIsEditorOpen(true);
  }

  function handleEditNote(note: Note) {
    setEditingNote(note);
    setIsEditorOpen(true);
  }

  function handleSaveNote(newNote: { title: string; content: string }) {
    if (editingNote) {
      setNotes(notes.map((n) => n.id === editingNote.id ? { ...n, ...newNote } : n));
    } else {
      const newId = Math.max(...notes.map((n) => n.id), 0) + 1;
      setNotes([
        ...notes,
        { id: newId, title: newNote.title, content: newNote.content },
      ]);
    }
    setIsEditorOpen(false);
    setEditingNote(null);
  }

  // ...existing code...
  function handleSignOut() {
    localStorage.removeItem('token');
  navigate('/signin');
  }

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col">
      <Header onSignOut={handleSignOut} />
      <div className="flex flex-1 flex-col items-center justify-center w-full px-4 py-10">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center">
          <WelcomeCard userName="Jonas Kahnwald" email="xxxxxx@xxxx.com" />
          <div className="w-full flex flex-col items-center justify-center mt-6">
            <CreateNoteButton onCreateNote={createNote} />
            <NotesList
              notes={notes}
              onDeleteNote={deleteNote}
              onEditNote={handleEditNote}
            />
          </div>
        </div>
      </div>
      {isEditorOpen && (
        <NoteEditor
          onSave={handleSaveNote}
          onCancel={() => { setIsEditorOpen(false); setEditingNote(null); }}
          initialTitle={editingNote?.title}
          initialContent={editingNote?.content}
        />
      )}
    </main>
  );
}

export default Dashboard;
