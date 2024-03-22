"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQueryState } from "nuqs";


export function ARTdetailPage({}) {
  const [id, setId] = useQueryState("id")

  return (
    <Dialog open={!!id} onOpenChange={(open) => { if (!open) setId(null) }}>
      <DialogContent className="bg-white max-w-none w-full h-full">
        HELLO WORLD
      </DialogContent>
    </Dialog>
  )
}