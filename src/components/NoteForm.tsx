import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NoteFormProps {
  note: Note | null;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const NoteForm = ({ note, onSave, onCancel, isEditing }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note.",
        variant: "destructive",
      });
      return;
    }

    onSave(title.trim(), content.trim());

    toast({
      title: isEditing ? "Note updated" : "Note created",
      description: isEditing
        ? "Your note has been successfully updated."
        : "Your new note has been created.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NoteCompass
              </h1>
            </div>

            <Button
              onClick={onCancel}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900">
              {isEditing ? "Edit Note" : "Create New Note"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your note title..."
                  className="text-lg font-medium border-slate-200 focus:border-blue-500 transition-colors"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium text-slate-700">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your note..."
                  className="min-h-[400px] resize-none border-slate-200 focus:border-blue-500 transition-colors text-base leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6">
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? "Update Note" : "Save Note"}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NoteForm;
