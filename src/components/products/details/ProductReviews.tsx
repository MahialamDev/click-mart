'use client';

import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Review } from '@/types/product';
import ReviewItem from './ReviewItem';

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    // Dispatch API submission logic here
    setNewComment('');
  };

  return (
    <div className="space-y-8">
      {/* Review Submission Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-200/40 p-5 rounded-2xl border border-base-200 space-y-3"
      >
        <h4 className="font-bold text-sm text-base-content flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" /> Write a Customer Review
        </h4>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your feedback about this product..."
          className="textarea textarea-bordered w-full text-sm rounded-xl focus:outline-none"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`w-4 h-4 cursor-pointer ${
                  star <= rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-base-300'
                }`}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary btn-sm rounded-xl font-bold">
            Submit Review
          </button>
        </div>
      </form>

      {/* Review List */}
      <div className="space-y-4 divide-y divide-base-200">
        {reviews.length > 0 ? (
          reviews.map((rev) => <ReviewItem key={rev.id} review={rev} />)
        ) : (
          <p className="text-xs text-base-content/60 italic py-4">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;