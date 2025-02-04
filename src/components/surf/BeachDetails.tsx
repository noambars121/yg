import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Waves,
  Wind,
  Thermometer,
  Users,
  Clock,
  Heart,
  Droplets,
  Sun,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Beach } from "@/types/beach";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BeachPhotos from "./BeachPhotos";
import BeachReviews from "./BeachReviews";

interface BeachDetailsProps {
  beach: Beach;
  onFavoriteToggle?: (beachId: string) => void;
}

export default function BeachDetails({
  beach,
  onFavoriteToggle = () => {},
}: BeachDetailsProps) {
  return (
    <Card className="w-full bg-gradient-to-br from-[#006daa]/90 to-[#31b9d2]/90 backdrop-blur-md max-h-[80vh] overflow-y-auto shadow-[0_8px_32px_rgba(0,141,218,0.3)] border border-white/10 rounded-3xl transition-all duration-500 ease-in-out">
      <CardHeader className="relative">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <CardTitle className="text-2xl">{beach.name}</CardTitle>
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium shadow-lg">
              <Crown className="w-3 h-3 ml-1" />
              פרימיום
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: `תנאי גלישה ב${beach.name}`,
                      text: `גלים: ${beach.waveHeight}\nרוח: ${beach.windSpeed}\nטמפרטורה: ${beach.temperature}`,
                      url: window.location.href,
                    })
                    .catch(console.error);
                } else {
                  // Fallback for desktop
                  navigator.clipboard.writeText(
                    `תנאי גלישה ב${beach.name}\nגלים: ${beach.waveHeight}\nרוח: ${beach.windSpeed}\nטמפרטורה: ${beach.temperature}\n\n${window.location.href}`,
                  );
                  toast({
                    title: "הקישור הועתק",
                    description: "תוכל להדביק ולשתף את הקישור",
                  });
                }
              }}
            >
              <Share2 className="h-5 w-5 text-white/70 hover:text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={() => onFavoriteToggle(beach.id)}
            >
              <Heart
                className={`h-5 w-5 transition-colors duration-300 ${beach.isFavorite ? "fill-red-500 text-red-500" : "text-white/70 hover:text-white"}`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conditions" className="w-full">
          <TabsList
            className="grid w-full grid-cols-3 bg-white/10 p-1 rounded-2xl"
            dir="rtl"
          >
            <TabsTrigger
              value="conditions"
              className="rounded-xl data-[state=active]:bg-white/20"
            >
              תנאים
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="rounded-xl data-[state=active]:bg-white/20"
            >
              תמונות
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-xl data-[state=active]:bg-white/20"
            >
              ביקורות
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conditions" className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl transition-all hover:bg-white/20">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Waves className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">גלים</p>
                  <p className="font-semibold">{beach.waveHeight}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl transition-all hover:bg-white/20">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Wind className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">רוח</p>
                  <p className="font-semibold">{beach.windSpeed}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl transition-all hover:bg-white/20">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Thermometer className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">טמפ׳</p>
                  <p className="font-semibold">{beach.temperature}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl transition-all hover:bg-white/20">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">עומס</p>
                  <p className="font-semibold">
                    {beach.crowdLevel === "low"
                      ? "נמוך"
                      : beach.crowdLevel === "medium"
                        ? "בינוני"
                        : "גבוה"}
                  </p>
                </div>
              </div>
            </div>

            {beach.forecast && (
              <div className="bg-white/10 p-4 rounded-2xl">
                <h4 className="text-sm font-semibold mb-4">
                  תחזית לשעות הקרובות
                </h4>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {beach.forecast.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center min-w-[80px] bg-white/10 p-3 rounded-xl transition-all hover:bg-white/20"
                    >
                      <span className="text-sm text-white/70">{item.time}</span>
                      <Waves className="h-4 w-4 my-2" />
                      <span className="text-sm font-medium">
                        {item.waveHeight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl transition-all hover:bg-white/20">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">טמפ׳ מים</p>
                  <p className="font-semibold">{beach.waterTemp}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl transition-all hover:bg-white/20">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">UV</p>
                  <p className="font-semibold">גבוה</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/60 bg-white/10 p-3 rounded-2xl">
              <Clock className="h-4 w-4" />
              <span>עודכן: {beach.lastUpdated}</span>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <BeachPhotos />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <BeachReviews />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
