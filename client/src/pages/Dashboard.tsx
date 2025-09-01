"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { WelcomeCard } from "../components/ui/WelcomeCard";
import { CreateNoteButton } from "../components/ui/CreateNoteButton";
import { NotesList } from "../components/ui/NotesList";
import { MarkdownViewer } from "../components/ui/MarkdownViewer";
import NoteEditor from "../components/NoteEditor";
import authService from "../services/auth.service";

interface Note {
  id: number;
  title: string;
  content: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notes, setNotes] = useState<Note[]>(() => [
    {
      id: 1,
      title: "Getting Started with Markdown",
      content: `# Welcome to Markdown Notes! 📝

This is a **sample note** written in *Markdown*. Here are some examples:

## Features
- **Bold text** and *italic text*
- \`inline code\` and code blocks
- Lists and checkboxes
- Links and images
- Tables and more!

## Code Example
\`\`\`javascript
const greeting = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greeting('World'));
\`\`\`

## Task List
- [x] Create markdown editor
- [x] Add syntax highlighting  
- [ ] Add more features
- [ ] Deploy to production

> **Note:** This editor supports GitHub Flavored Markdown (GFM) for rich formatting!

[Learn more about Markdown](https://guides.github.com/features/mastering-markdown/)`,
    },
    {
      id: 2,
      title: "Meeting Notes - Project Planning",
      content: `# Project Planning Meeting
**Date:** September 1, 2025  
**Attendees:** Team Alpha

## Agenda
1. Review current progress
2. Discuss upcoming features
3. Plan next sprint

## Key Decisions
| Decision | Owner | Due Date |
|----------|-------|----------|
| UI Design | John | Sept 15 |
| Backend API | Sarah | Sept 20 |
| Testing | Mike | Sept 25 |

## Action Items
- [ ] Create wireframes
- [ ] Set up CI/CD pipeline
- [ ] Write unit tests

## Notes
> The team agreed to use **Agile methodology** for faster delivery.

**Next meeting:** September 8, 2025`,
    },
  ]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      // First try API call since /me endpoint is now available
      try {
        const response = await authService.getCurrentUser();
        
        // Handle different possible response structures
        let userData;
        if (response.data.user) {
          userData = response.data.user;
        } else if (response.data.name || response.data.email) {
          userData = response.data;
        } else {
          userData = response.data;
        }
        
        setUser({
          name: userData.name || userData.username || userData.email?.split('@')[0] || 'User',
          email: userData.email || 'No email provided'
        });
        return;
      } catch (error) {
        // Silent error handling for production
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch user data from API:', error);
        }
      }
      
      // Fallback to localStorage if API fails
      const storedEmail = localStorage.getItem('userEmail');
      const storedName = localStorage.getItem('userName');
      
      if (storedEmail) {
        setUser({
          name: storedName || storedEmail.split('@')[0],
          email: storedEmail
        });
      } else {
        // If no stored data and API fails, redirect to signin
        localStorage.clear(); // Clear all potentially corrupted data
        navigate('/signin');
      }
    };

    fetchUserData();
  }, [navigate]);

  function deleteNote(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function createNote() {
    setEditingNote(null);
    setIsEditorOpen(true);
  }

  function handleEditNote(note: Note) {
    setEditingNote(note);
    setViewingNote(null);
    setIsEditorOpen(true);
  }

  function handleViewNote(note: Note) {
    setViewingNote(note);
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
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/signin');
  }

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col">
      <Header onSignOut={handleSignOut} />
      <div className="flex flex-1 flex-col items-center justify-center w-full px-4 py-10">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center">
          <WelcomeCard 
            userName={user?.name || 'User'} 
            email={user?.email || 'Loading...'} 
          />
          <div className="w-full flex flex-col items-center justify-center mt-6">
            <CreateNoteButton onCreateNote={createNote} />
            <NotesList
              notes={notes}
              onDeleteNote={deleteNote}
              onEditNote={handleEditNote}
              onViewNote={handleViewNote}
            />
          </div>
        </div>
      </div>
      
      {/* Note Editor Modal */}
      {isEditorOpen && (
        <NoteEditor
          onSave={handleSaveNote}
          onCancel={() => { setIsEditorOpen(false); setEditingNote(null); }}
          initialTitle={editingNote?.title}
          initialContent={editingNote?.content}
        />
      )}

      {/* Markdown Viewer Modal */}
      {viewingNote && (
        <MarkdownViewer
          title={viewingNote.title}
          content={viewingNote.content}
          onEdit={() => handleEditNote(viewingNote)}
          onClose={() => setViewingNote(null)}
        />
      )}
    </main>
  );
}

export default Dashboard;
