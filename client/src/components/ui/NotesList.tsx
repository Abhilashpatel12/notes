import * as React from "react";
import { NoteItem } from "./NoteItem";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: number) => void;
  onEditNote: (note: Note) => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  onDeleteNote,
  onEditNote,
}) => {
  return (
    <section className="absolute left-4 max-w-full top-[315px] w-[calc(100%_-_32px)] max-md:max-w-full max-sm:max-w-[343px] max-sm:top-[373px] max-sm:w-[calc(100%_-_32px)]">
      <h2 className="mx-0 mt-0 mb-5 text-xl font-medium tracking-tighter leading-6 text-neutral-800">
        Notes
      </h2>
      <div className="flex flex-col gap-2.5">
        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} onDelete={onDeleteNote} onEdit={onEditNote} />
        ))}
      </div>
    </section>
  );
};
