
import { useState } from "react";
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";
import NoteForm from "@/components/NoteForm";

export type User = {
  id: string;
  email: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentView, setCurrentView] = useState<'dashboard' | 'add' | 'edit'>('dashboard');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    console.log('Login attempt:', email, password);
    setUser({ id: '1', email });
  };

  const handleSignup = (email: string, password: string) => {
    // Mock signup - in real app, this would call an API
    console.log('Signup attempt:', email, password);
    setUser({ id: '1', email });
  };

  const handleLogout = () => {
    setUser(null);
    setNotes([]);
    setCurrentView('dashboard');
  };

  const handleAddNote = () => {
    setEditingNote(null);
    setCurrentView('add');
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setCurrentView('edit');
  };

  const handleSaveNote = (title: string, body: string) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, title, body, updatedAt: new Date().toISOString() }
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }
    setCurrentView('dashboard');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleCancel = () => {
    setCurrentView('dashboard');
  };

  if (!user) {
    return <AuthPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  if (currentView === 'add' || currentView === 'edit') {
    return (
      <NoteForm
        note={editingNote}
        onSave={handleSaveNote}
        onCancel={handleCancel}
        isEditing={currentView === 'edit'}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      notes={notes}
      onLogout={handleLogout}
      onAddNote={handleAddNote}
      onEditNote={handleEditNote}
      onDeleteNote={handleDeleteNote}
    />
  );
};

export default Index;
