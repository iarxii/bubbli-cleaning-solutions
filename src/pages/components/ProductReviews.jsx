import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import media
import placholder from "../../assets/placeholder-productimg.jpg";

const reviews = [
  {
    id: 1,
    stars: 5,
    review: "Great product!",
    reviewer: "User 1",
    date: "2025-02-10",
    productImg: placholder,
  },
  // Add more reviews as needed
];

const ProductReviews = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);

  const filteredReviews = reviews.filter(
    (review) =>
      review.review.toLowerCase().includes(search.toLowerCase()) &&
      (filter === 0 || review.stars === filter),
  );

  return (
    <div className="glassmorphic">
      {/* Hero Title */}
      <div className="z-10 mb-5 grid gap-y-4 bg-[#f7f7f7] p-10 text-center shadow-md">
        <h1 className="text-[#FB6F92]">Product Reviews</h1>
        <p className="text-black">
          See what customers are saying about our products
        </p>
      </div>

      <div className="p-4">
        {/* filters */}
        <div className="mb-4 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faSearch}
            className="h-6 pr-2 text-[#FB6F92]"
          />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded border bg-[#ccc] p-2 text-black"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(Number(e.target.value))}
            className="ml-2 rounded border bg-[#ccc] p-2 text-black"
          >
            <option value={0}>All Reviews</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Stars
              </option>
            ))}
          </select>
        </div>

        {/* reviews list */}
        <ul>
          {filteredReviews.map((review) => (
            <li
              key={review.id}
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="flex items-center gap-x-2">
                <div
                  className="rounded-xl"
                  style={{ /*minHeight: "200px",*/ maxWidth: "200px" }}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={review.productImg}
                    alt={review.productImgAlt}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#e49009]" style={{ fontSize: "30px" }}>
                    {"★".repeat(review.stars)}
                  </p>
                  <p>{review.review}</p>
                  <p>Reviewed by: {review.reviewer}</p>
                  <p>Date: {review.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductReviews;
