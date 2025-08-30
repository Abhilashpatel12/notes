import * as React from "react";
import { StarIcon } from "./StarIcon";

interface HeaderProps {
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSignOut }) => {
  return (
    <header className="flex w-full justify-between items-center px-8 py-6 border-b border-gray-200">
      <div className="flex gap-3 items-center">
        <StarIcon />
        <h1 className="m-0 text-xl font-medium tracking-tighter leading-6 text-neutral-800">
          Dashboard
        </h1>
      </div>
      <button
        className="text-sm font-semibold text-blue-500 underline cursor-pointer border-[none]"
        onClick={onSignOut}
      >
        Sign Out
      </button>
    </header>
  );
};
