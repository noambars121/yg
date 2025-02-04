import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

interface BeachReviewsProps {
  reviews?: Review[];
}

export default function BeachReviews({
  reviews = [
    {
      id: "1",
      user: {
        name: "רון כהן",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ron",
      },
      rating: 5,
      comment: "גלים מעולים היום! מומלץ להגיע מוקדם בבוקר.",
      date: "לפני שעה",
      likes: 12,
    },
    {
      id: "2",
      user: {
        name: "מאיה לוי",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
      },
      rating: 4,
      comment: "חוף נקי ונעים, הגלים היו בינוניים.",
      date: "לפני 3 שעות",
      likes: 8,
    },
  ],
}: BeachReviewsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">ביקורות גולשים</h3>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/20 border border-white/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-row-reverse">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="font-medium ml-2">{review.user.name}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                  <p className="text-sm">{review.comment}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                {review.likes}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
