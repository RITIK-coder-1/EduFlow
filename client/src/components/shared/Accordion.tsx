/* ----------------------------------------------------------------------------------------------
Accordion.tsx
The custom accordion elements
------------------------------------------------------------------------------------------------- */

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon } from "lucide-react";

interface CourseCommonAccordionProps {
  children: React.ReactNode;
}

// The accordion

export function CourseCommonAccordion({ children }: CourseCommonAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {children}
    </Accordion>
  );
}

interface CourseCommonAccordionItemProps {
  children: React.ReactNode;
  value: string;
}

// The accordion item
export function CourseCommonAccordionItem({ children, value }: CourseCommonAccordionItemProps) {
  return (
    <AccordionItem value={value} className="border border-white/5">
      {children}
    </AccordionItem>
  );
}

interface CourseAccordionTriggerProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// The accordion trigger
export function CourseAccordionTrigger({ children, onClick }: CourseAccordionTriggerProps) {
  return (
    <AccordionTrigger 
      onClick={onClick}
      className="w-full border-b rounded-none px-2 bg-white/3 border-white/5 text-md flex justify-between items-center"
    >
      {/* The trigger title */}
      {children}

      {/* The trigger icon */}
      <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
    </AccordionTrigger>
  );
}

interface CourseAccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

// The accordion content
export function CourseAccordionContent({ children, className = "" }: CourseAccordionContentProps) {
  return (
    <AccordionContent
      className={`w-full flex flex-col gap-7 justify-between items-center ${className}`}
    >
      {/* The videos */}
      <ol className="w-full list-decimal flex flex-col justify-center items-start gap-2 text-lg">
        {children}
      </ol>
    </AccordionContent>
  );
}