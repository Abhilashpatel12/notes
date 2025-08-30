"use client";
import * as React from "react";
import { useState } from "react";
import { Header } from "../components/ui/Header";
import { WelcomeCard } from "../components/ui/WelcomeCard";
import { CreateNoteButton } from "../components/ui/CreateNoteButton";
import { NotesList } from "../components/ui/NotesList";

interface Note {
  id: number;
  title: string;
}

function Dashboard() {
  const [notes, setNotes] = useState<Note[]>(() => [
    {
      id: 1,
      title: "Note 1",
    },
    {
      id: 2,
      title: "Note 2",
    },
  ]);

  function deleteNote(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function createNote() {
    const newId = Math.max(...notes.map((n) => n.id), 0) + 1;
    const newNote: Note = {
      id: newId,
      title: `Note ${newId}`,
    };
    setNotes([...notes, newNote]);
  }

  function handleSignOut() {
    console.log("Sign out clicked");
  }

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col">
      <Header onSignOut={handleSignOut} />
      <div className="flex flex-1 flex-col items-center justify-center w-full px-4 py-10">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center">
          <WelcomeCard userName="Jonas Kahnwald" email="xxxxxx@xxxx.com" />
          <div className="w-full flex flex-col items-center justify-center mt-6">
            <CreateNoteButton onCreateNote={createNote} />
            <NotesList notes={notes} onDeleteNote={deleteNote} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
