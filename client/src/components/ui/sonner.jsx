import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "group toast !bg-[#0f0a1f]/80 !backdrop-blur-md !text-slate-100 !shadow-[0_0_20px_rgba(0,0,0,0.4)] !rounded-2xl !px-4 !py-4 !text-sm !border-white/10 !flex !items-center !gap-3",
          description: "group-[.toast]:text-slate-400 text-xs",

          actionButton:
            "group-[.toast]:bg-[#7c3aed] group-[.toast]:text-white font-semibold rounded-lg px-3 py-1",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-slate-300",

          success:
            "!border-emerald-500/50 !shadow-[0_0_15px_rgba(16,185,129,0.15)]",
          error: "!border-rose-500/50 !shadow-[0_0_15px_rgba(244,63,94,0.15)]",
          warning:
            "!border-amber-500/50 !shadow-[0_0_15px_rgba(245,158,11,0.15)]",
          info: "!border-blue-500/50 !shadow-[0_0_15px_rgba(59,130,246,0.15)]",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-400" />,
        info: <InfoIcon className="size-5 text-blue-400" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-400" />,
        error: <OctagonXIcon className="size-5 text-rose-400" />,
        loading: (
          <Loader2Icon className="size-5 animate-spin text-violet-400" />
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
