import { cn } from "@/lib/utils";

export function TextLogo({ className }) {
  return (
    <span className={cn("text-xl font-bold", className)}>Cari<span className="text-primary">ART</span></span>
  )
}