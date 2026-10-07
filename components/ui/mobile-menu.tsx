"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, LogOut, Menu, SquareArrowRight } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileMenu({
  user,
  handleSignOut,
}: {
  user: User | null;
  handleSignOut: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/workspace", label: "Workspace" },
    {
      href: "https://github.com/Frankenstein-Labs/Cortex-official/tree/main/cortex-platform/docs",
      label: "Documentation",
      external: true,
    },
    {
      href: "https://github.com/Frankenstein-Labs/Cortex-official",
      label: "GitHub",
      external: true,
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-center">Cortex</SheetTitle>
        </SheetHeader>
        <div className="space-y-3">
          {user ? (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                void handleSignOut();
                close();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline">
                <Link href="/signin" onClick={close}>
                  <LogIn className="mr-2 h-4 w-4" /> Sign in
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup" onClick={close}>
                  <SquareArrowRight className="mr-2 h-4 w-4" /> Sign up
                </Link>
              </Button>
            </div>
          )}
          <nav aria-label="Mobile navigation">
            <ul className="divide-y divide-slate-100">
              {links.map(({ href, label, external }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onClick={close}
                    className="block py-4 text-base font-medium text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
