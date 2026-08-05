/* ----------------------------------------------------------------------------------------------
Spinner.tsx
------------------------------------------------------------------------------------------------- */

import { Spinner } from "@/components/ui/spinner";

interface SpinnerContract {
  className?: string;
}

export function SpinnerCustom({ className }: SpinnerContract) {
  return (
    <span className="flex items-center gap-4">
      <Spinner className={className} />
    </span>
  );
}
