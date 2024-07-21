// mockApi.js
export const mockReviews = {
  "2023-07-01": [{ id: 1, content: "Had a great croissant!" }],
  "2023-07-03": [{ id: 2, content: "Tried a new baguette." }],
  // Add more dates and reviews as needed
};

export const fetchReviewsByDate = (date) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReviews[date] || []);
    }, 100);
  });
};
