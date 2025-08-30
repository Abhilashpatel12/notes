import * as React from "react";
import { DeleteIcon } from "./DeleteIcon";

interface Note {
  id: number;
  title: string;
}

interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  return (
    <article className="flex justify-between items-center p-4 w-full bg-white rounded-xl border border-solid shadow-sm border-zinc-300 h-[50px]">
      <p className="text-base leading-10 flex-[1_0_0] text-neutral-800">
        {note.title}
      </p>
      <button
        className="flex justify-center items-center p-1 cursor-pointer border-[none]"
        aria-label={`Delete ${note.title}`}
        onClick={() => onDelete(note.id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onDelete(note.id);
          }
        }}
      >
        <DeleteIcon />
      </button>
    </article>
  );
};
