import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  classNames,
  children,
  buttonText,
  handleClick,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-1 text-white w-full max-w-[520px] border-none px-6 py-9">
        <div className="flex flex-col gap-5">
          <h1 className={`text-3xl font-bold leading-[42px] ${classNames}`}>
            {title}
          </h1>
          {children}
          <Button
            onClick={handleClick}
            className="bg-dark-2 hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {buttonText || "Schedule Metting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
