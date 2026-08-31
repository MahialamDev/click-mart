import React from 'react';
import Image from 'next/image';
import { Star, ThumbsUp } from 'lucide-react';
import { Review } from '@/types/product';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const userName = review.user || review.userName || 'Anonymous User';
  const avatarSrc = review.avatar || 'https://i.pravatar.cc/150?img=11';

  return (
    <div className="pt-4 first:pt-0 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-base-200">
            <Image
              src={avatarSrc}
              alt={userName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h5 className="font-bold text-sm text-base-content">{userName}</h5>
            <span className="text-xs text-base-content/50">
              {review.date ||
                (review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : 'Recent')}
            </span>
          </div>
        </div>
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating ? 'fill-amber-400' : 'text-base-300'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-base-content/80 leading-relaxed pl-13">
        {review.comment}
      </p>
      <div className="pl-13">
        <button
          type="button"
          className="btn btn-xs btn-ghost gap-1 text-base-content/60 hover:text-primary"
        >
          <ThumbsUp className="w-3 h-3" /> Helpful ({review.likes || 0})
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;