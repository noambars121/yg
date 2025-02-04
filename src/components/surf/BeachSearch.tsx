import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BeachSearchProps {
  onSearch: (query: string) => void;
}

export default function BeachSearch({ onSearch }: BeachSearchProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/50 transform rotate-0" />
      <Input
        placeholder="חיפוש חופים..."
        className="pr-10 text-right w-full bg-white/10 backdrop-blur-md border-white/20 focus:border-white/40 transition-all duration-300 text-white placeholder:text-white/50 rounded-2xl h-12"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
