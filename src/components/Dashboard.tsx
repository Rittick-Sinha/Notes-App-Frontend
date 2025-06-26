import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NoteCard from "@/components/NoteCard";
import { fetchNotes, createNote, deleteNote, updateNote } from "@/lib/api";
import { Input } from "@/components/ui/input";
import NoteForm from "@/components/NoteForm";

interface Note {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchNotes(token)
      .then(setNotes)
      .catch(() => toast({ title: "Failed to load notes", variant: "destructive" }));
  }, [token, navigate, toast]);

  const handleAddNote = async () => {
    if (!newTitle || !newContent) {
      toast({ title: "Title and content required", variant: "destructive" });
      return;
    }
    try {
      const note = await createNote(token!, newTitle, newContent);
      setNotes((prev) => [note, ...prev]);
      setNewTitle("");
      setNewContent("");
      setIsAdding(false);
      toast({ title: "Note added" });
    } catch {
      toast({ title: "Failed to create note", variant: "destructive" });
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(token!, id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast({ title: "Note deleted" });
    } catch {
      toast({ title: "Failed to delete note", variant: "destructive" });
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleUpdateNote = async (title: string, content: string) => {
    if (!editingNote) return;
    try {
      const updated = await updateNote(token!, editingNote._id, title, content);
      const updatedNote = { ...updated, updatedAt: updated.updatedAt || new Date().toISOString() };
      setNotes((prev) =>
        prev.map((n) => (n._id === editingNote._id ? updatedNote : n))
      );
      setEditingNote(null);
      toast({ title: "Note updated" });
    } catch {
      toast({ title: "Failed to update note", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NoteCompass
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600 hidden sm:block">
                {user?.email || ""}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-slate-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Your Notes</h2>
            <p className="text-slate-600 mt-1">
              {notes.length === 0
                ? "Start by creating your first note"
                : `${notes.length} ${notes.length === 1 ? "note" : "notes"} saved`}
            </p>
          </div>

          <Button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </Button>
        </div>

        {/* Edit Note Form */}
        {editingNote && (
          <div className="mb-6">
            <NoteForm
              note={editingNote}
              onSave={handleUpdateNote}
              onCancel={() => setEditingNote(null)}
              isEditing={true}
            />
          </div>
        )}

        {/* New Note Form */}
        {isAdding && (
          <div className="bg-white rounded-lg shadow p-4 mb-6 space-y-2 border border-slate-200">
            <Input
              placeholder="Note Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              className="w-full border border-slate-300 rounded-lg p-2 focus:outline-blue-500"
              placeholder="Write your note here..."
              rows={4}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewTitle("");
                  setNewContent("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddNote}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                Add Note
              </Button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <Card className="border-2 border-dashed border-slate-300 bg-white/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No notes yet</h3>
              <p className="text-slate-600 text-center mb-6 max-w-md">
                Create your first note to start organizing your thoughts and ideas.
              </p>
              <Button
                onClick={() => setIsAdding(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Note
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={() => handleDeleteNote(note._id)}
                onEdit={() => handleEditNote(note)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
