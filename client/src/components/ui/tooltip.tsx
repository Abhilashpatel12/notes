import * as React from "react";
import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
}

// Simple tooltip provider that doesn't require radix-ui
const TooltipProvider: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

// Simple tooltip components for compatibility
const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

const TooltipTrigger: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

const TooltipContent: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
