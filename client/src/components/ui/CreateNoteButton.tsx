"use client";
import * as React from "react";

interface CreateNoteButtonProps {
  onCreateNote: () => void;
}

export const CreateNoteButton: React.FC<CreateNoteButtonProps> = ({
  onCreateNote,
}) => {
  return (
    <button
      className="flex absolute left-4 justify-center items-center px-2 py-4 max-w-full bg-blue-500 rounded-xl cursor-pointer border-[none] duration-[0.2s] ease-[ease] h-[52px] top-[235px] transition-[background-color] w-[calc(100%_-_32px)] max-md:max-w-full max-sm:max-w-[343px] max-sm:top-[283px] max-sm:w-[calc(100%_-_32px)]"
      onClick={onCreateNote}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onCreateNote();
        }
      }}
      onMouseEnter={(event) => (event.target.style.backgroundColor = "#2563eb")}
      onMouseLeave={(event) => (event.target.style.backgroundColor = "#367AFF")}
      style={{
        backgroundColor: "#367AFF",
      }}
    >
      <span className="text-base font-semibold tracking-normal leading-5 text-white">
        Create Note
      </span>
    </button>
  );
};
