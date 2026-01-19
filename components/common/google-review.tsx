'use client'

// GoogleReview.tsx
import { GoogleReview as GRev, useGooglePlaceReviews } from '@/hooks/use-google-place-reviews';
import React, { useMemo, useState } from 'react';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y,Autoplay  } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface GoogleReviewProps {
  placeName: string;
  className?: string;
}

const GoogleReview: React.FC<GoogleReviewProps> = ({ placeName, className = '' }) => {
  const { data, loading, error } = useGooglePlaceReviews(placeName);
  const [selectedReview, setSelectedReview] = useState<GRev| null>(null);

  const sortedReviews = useMemo(() => {
    if (!data?.reviews) return [];
    return [...data.reviews].sort((a, b) => b.rating - a.rating);
  }, [data?.reviews]);

  if (loading) {
    return (
      <div className={`py-6 bg-white rounded-lg ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`p-6 bg-white rounded-lg ${className}`}>
        <p className="text-red-600 text-center">
          Unable to load Google reviews: {error || 'Place not found'}
        </p>
      </div>
    );
  }

  return (
    <div className={`py-6 bg-white ${className}`}>
      <h3 className="sr-only">{data.name}</h3>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-gray-900">{data.rating.toFixed(1)}</span>
          <span className="text-yellow-500 ml-2 text-2xl">⭐</span>
        </div>
        <span className="text-gray-600 text-lg">
          ({data.user_ratings_total.toLocaleString()} reviews on Google)
        </span>
      </div>

      {data.formatted_address && (
        <p className="text-sm text-gray-500 mb-6 sr-only">{data.formatted_address}</p>
      )}

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 text-lg">Recent Reviews</h4>

        {sortedReviews.length > 0 ? (
          <>
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable:true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="!pb-12" // more space for pagination
            >
              {sortedReviews.map((review, index) => (
                <SwiperSlide key={`${review.author_name}-${review.time}-${index}`}>
                  <div
                    onClick={() => setSelectedReview(review)}
                    className="group relative p-5 bg-gray-50 rounded-xl border border-gray-200 
                               flex flex-col  cursor-pointer hover:shadow-md 
                               transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">
                          {review.author_name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="font-semibold text-gray-800">{review.rating}</span>
                          <span className="text-yellow-500 text-lg">⭐</span>
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

                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {review.text || <em className="text-gray-400">No comment provided</em>}
                    </p>

                    {/* Subtle hint that it's clickable */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black/5 rounded-xl pointer-events-none transition-opacity" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Dialog / Modal */}
            {selectedReview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="sticky top-0 bg-white px-6 pt-5 pb-3 border-b flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {selectedReview.author_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-gray-800">{selectedReview.rating}</span>
                        <span className="text-yellow-500 text-xl">⭐</span>
                        <span className="text-sm text-gray-500">
                          {new Date(selectedReview.time * 1000).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedReview(null)}
                      className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className="px-6 py-5">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedReview.text || 'No comment provided.'}
                    </p>
                  </div>

                  <div className="px-6 py-4 border-t text-right">
                    <button
                      onClick={() => setSelectedReview(null)}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No individual reviews available (Google usually returns max 5 helpful ones)
          </p>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-8 text-center sr-only">Powered by Google</p>
    </div>
  );
};

export default GoogleReview;