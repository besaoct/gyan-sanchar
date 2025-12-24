// GoogleReview.tsx
import { useGooglePlaceReviews } from '@/hooks/use-google-place-reviews';
import React from 'react';


interface GoogleReviewProps {
  placeName: string; // e.g., "Vels Institute of Science Technology Advanced Studies Pallavaram Chennai"
  className?: string;
}

const GoogleReview: React.FC<GoogleReviewProps> = ({ placeName, className = '' }) => {

  const { data, loading, error } = useGooglePlaceReviews(placeName);

  if (loading) {
    return (
      <div className={`py-6 bg-white rounded-lg  ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`p-6 bg-white rounded-lg  ${className}`}>
        <p className="text-red-600 text-center">
          Unable to load Google reviews: {error || 'Place not found'}
        </p>
      </div>
    );
  }

  return (
    <div className={`py-6 bg-white  ${className}`}>
     
      <h3 className="sr-only">{data.name}</h3>

      <div className="flex items-center gap-3 mb-4">

        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-900">{data.rating}</span>
          <span className="text-yellow-500 ml-1">⭐</span>
        </div>
        <span className="text-gray-600 flex items-center gap-1.5">
          ({data.user_ratings_total.toLocaleString()} reviews on Google)

        </span>
      </div>

      {data.formatted_address && (
        <p className="text-sm text-gray-500 mb-5 sr-only">{data.formatted_address}</p>
      )}

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-700">Recent Reviews</h4>

        {data.reviews.length > 0 ? (
          data.reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-800 line-clamp-1">{review.author_name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-medium">{review.rating}</span>
                    <span className="text-yellow-500">⭐</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(review.time * 1000).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {review.text || <em className="text-gray-400">No comment provided</em>}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">
            No individual reviews available (Google API returns max 5 most helpful)
          </p>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-6 text-center sr-only">
        Powered by Google 
      </p>
    </div>
  );
};

export default GoogleReview;