"use client";
import React from "react";
import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const isOpen = active === item;

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.button
        type="button"
        transition={{ duration: 0.2 }}
        className={cn(
          "flex items-center gap-1 cursor-pointer font-medium text-sm transition-colors duration-200 select-none",
          isOpen ? "text-primary" : "text-gray-700 hover:text-primary"
        )}
      >
        {item}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex items-center"
        >
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.span>
      </motion.button>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {isOpen && (
            <div className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)]"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative bg-none flex justify-center items-center space-x-4 px-6 py-3"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, ...rest }: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      {...rest}
      className="text-sm text-gray-700 hover:text-primary transition-colors duration-150"
    >
      {children}
    </Link>
  );
};
