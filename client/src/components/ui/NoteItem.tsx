interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
  onView?: (note: Note) => void;
}
import * as React from "react";
import { DeleteIcon } from "./DeleteIcon";

interface Note {
  id: number;
  title: string;
  content: string;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onEdit, onView }) => {
  // Create a preview of the content (first 100 characters, remove markdown syntax)
  const createPreview = (content: string) => {
    if (!content) return 'No content';
    
    // Remove markdown syntax for preview
    const plainText = content
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
      .replace(/>\s+/g, '') // Remove blockquotes
      .replace(/[-*+]\s+/g, '') // Remove list markers
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
      
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
  };

  return (
    <article
      className="flex flex-col justify-between p-4 w-full bg-white rounded-xl border border-solid shadow-sm border-zinc-300 min-h-[80px] hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1 flex-1 mr-2">
          {note.title || 'Untitled Note'}
        </h3>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={(e) => { e.stopPropagation(); onEdit(note); }}
            title="Edit note"
          >
            Edit
          </button>
          <button
            className="flex justify-center items-center p-1 cursor-pointer border-none opacity-60 hover:opacity-100 transition-opacity"
            aria-label={`Delete ${note.title}`}
            onClick={e => { e.stopPropagation(); onDelete(note.id); }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onDelete(note.id);
              }
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      
      <div 
        className="text-sm text-gray-600 line-clamp-2 cursor-pointer hover:text-gray-800 transition-colors"
        onClick={() => onView && onView(note)}
        title="Click to view full note"
      >
        {createPreview(note.content)}
      </div>
      
      {note.content && (
        <div className="mt-2 text-xs text-blue-600 flex items-center gap-1">
          <span>📝</span>
          <span>Markdown content</span>
        </div>
      )}
    </article>
  );
};
