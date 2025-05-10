"use client";
import { useEffect, useRef, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command as CommandWrapper,
} from "./ui/command";
import { Command, Link, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "./ui/use-mobile";
import { Card } from "./ui/card";
import { useLanguage } from "./language-toggle";
import type { Command as Cmd } from "@/lib/global-search";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "./ui/drawer";

const searchLabel = {
  "pt-BR": "Bucar",
  "en-US": "Search",
};

export function GlobalSearch({ commands }: { commands: Cmd[] }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);
  const [language] = useLanguage();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (open) {
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  const isMacOS =
    typeof window !== "undefined" &&
    window.navigator &&
    (window.navigator.platform?.includes("Mac") ||
      window.navigator.userAgent.includes("Mac"));

  const toggleOpen = () => setOpen((open) => !open);
  return (
    <>
      <div onClick={toggleOpen} onKeyUp={toggleOpen}>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Search className="w-5 h-5" />
        </Button>

        <Card className="hidden md:flex text-xs text-muted-foreground hover:text-primary items-center justify-center gap-3 py-2 px-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200 ease-in-out min-w-min">
          <span>{searchLabel[language]}</span>
          <span className="flex items-center gap-1">
            {isMacOS ? <Command className="w-3 h-3" /> : "Ctrl"} + K
          </span>
        </Card>
      </div>
      {(() => {
        if (!open) {
          return null;
        }

        if (isMobile) {
          return (
            <Drawer onOpenChange={setOpen} autoFocus open>
              <DrawerTitle className="hidden">global search</DrawerTitle>
              <DrawerDescription className="hidden">
                global search
              </DrawerDescription>
              <DrawerContent>
                <CommandWrapper className="bg-white dark:bg-background md:min-w-[450px] px-2 py-4">
                  <CommandInput
                    className="flex"
                    placeholder="Type a command or search..."
                    ref={inputRef}
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {commands.map((command) =>
                      renderCommandItem(command, setOpen),
                    )}
                  </CommandList>
                </CommandWrapper>
              </DrawerContent>
            </Drawer>
          );
        }

        return (
          <CommandDialog onOpenChange={setOpen} open>
            <CommandInput
              placeholder="Type a command or search..."
              ref={inputRef}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {commands.map((command) => renderCommandItem(command, setOpen))}
            </CommandList>
          </CommandDialog>
        );
      })()}
    </>
  );
}

function renderCommandItem(command: Cmd, setOpen: (open: boolean) => void) {
  const language = (
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1]
      : "pt-BR"
  ) as "pt-BR" | "en-US";

  switch (command.kind) {
    case "link":
      return (
        <CommandItem
          key={command.value}
          asChild
          className="cursor-pointer"
          onSelect={() => {
            window.location.href = command.value;
            setOpen(false);
          }}
        >
          <span className="flex justify-between">
            <span>{command.name[language]}</span>
            <Link className="w-4 h-4" />
          </span>
        </CommandItem>
      );
    case "group":
      return (
        <CommandGroup
          key={command.name[language]}
          heading={command.name[language]}
        >
          {command.value.map((e) => renderCommandItem(e, setOpen))}
        </CommandGroup>
      );
    default:
      return null;
  }
}
