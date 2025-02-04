import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Beach } from "@/types/beach";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Wind, Thermometer } from "lucide-react";

interface RecommendedBeachProps {
  beaches: Beach[];
}

export default function RecommendedBeach({ beaches }: RecommendedBeachProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % beaches.length);
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, [beaches.length]);

  if (!beaches.length) return null;

  const beach = beaches[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={beach.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-[#008DDA] to-[#41C9E2] border-none shadow-xl rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505459668311-8dfac7952bf0')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1 text-white">
              החוף המומלץ כרגע
            </h2>
            <h3 className="text-3xl font-bold mb-4 text-white/90">
              {beach.name}
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <Waves className="h-5 w-5" />
                <span>{beach.waveHeight}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Wind className="h-5 w-5" />
                <span>{beach.windSpeed}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Thermometer className="h-5 w-5" />
                <span>{beach.temperature}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
