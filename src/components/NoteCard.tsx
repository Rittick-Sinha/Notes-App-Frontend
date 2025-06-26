import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
  onEdit: () => void;
}

const NoteCard = ({ note, onDelete, onEdit }: NoteCardProps) => {
  const { toast } = useToast();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete();
      toast({
        title: "Note deleted",
        description: "Your note has been successfully deleted.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] bg-white border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-slate-900 text-lg leading-tight">
            {truncateText(note.title || "Untitled", 50)}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={onEdit}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
            >
              <span className="sr-only">Edit</span>
              ✏️
            </Button>
            <Button
              onClick={handleDelete}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-slate-500">{formatDate(note.updatedAt)}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-slate-600 text-sm leading-relaxed">
          {truncateText(note.content || "No content", 120)}
        </p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
