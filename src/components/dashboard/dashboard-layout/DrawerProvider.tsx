"use client";

import { createContext, PropsWithChildren, useState } from "react";

export const DrawerContext = createContext({
  isOpen: true,
  handleOpen: () => {},
  handleClose: () => {},
});

export default function DrawerProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <DrawerContext
      value={{
        isOpen: open,
        handleClose,
        handleOpen,
      }}
    >
      {children}
    </DrawerContext>
  );
}
