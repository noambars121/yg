import { useState } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BeachPhotosProps {
  photos?: string[];
}

export default function BeachPhotos({
  photos = [
    "https://images.unsplash.com/photo-1505459668311-8dfac7952bf0",
    "https://images.unsplash.com/photo-1502680390469-be75c86b636f",
    "https://images.unsplash.com/photo-1520942702018-0862200e6873",
  ],
}: BeachPhotosProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">תמונות מהחוף</h3>
        <Button variant="outline" size="sm">
          <Camera className="h-4 w-4 mr-2" />
          העלה תמונה
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button className="relative group overflow-hidden rounded-md">
                <AspectRatio ratio={1}>
                  <img
                    src={`${photo}?w=300&h=300&fit=crop`}
                    alt="Beach photo"
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-white" />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <img
                src={`${photo}?w=1200&h=800&fit=crop`}
                alt="Beach photo"
                className="w-full h-full object-cover rounded-lg"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
