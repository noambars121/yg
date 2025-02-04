import { Card } from "./card";

export function SkeletonCard() {
  return (
    <Card className="w-full bg-gradient-to-br from-card/80 to-card/60 border border-white/5 rounded-3xl p-6 space-y-4">
      <div className="space-y-2">
        <div className="h-4 w-1/2 bg-primary/20 rounded animate-pulse" />
        <div className="h-3 w-1/3 bg-primary/10 rounded animate-pulse" />
      </div>
      <div className="flex justify-end gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-6 w-12 bg-primary/10 rounded animate-pulse"
          />
        ))}
      </div>
    </Card>
  );
}
