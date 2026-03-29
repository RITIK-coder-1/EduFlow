/* ----------------------------------------------------------------------------------------------
Spinner.jsx
------------------------------------------------------------------------------------------------- */

import { Spinner } from "@/components/ui/spinner"

export function SpinnerCustom({className}) {
  return (
    <span className="flex items-center gap-4">
      <Spinner className={className}/>
    </span>
  );
}
