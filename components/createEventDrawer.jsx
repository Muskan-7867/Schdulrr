"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import EventForm from './eventform'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer"; // Ensure these are all named exports

import { Button } from "./ui/button";
import { useSearchParams, useRouter } from "next/navigation";

export function CreateEventDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  // Function to handle the closing of the Drawer
  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window.location?.pathname);
    }
  };

  return (
    <>
      <Button>Open Drawer</Button> {/* Button to open the drawer */}
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
          </DrawerHeader>
          <EventForm onSubmitForm={() => handleClose()} />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateEventDrawer;
