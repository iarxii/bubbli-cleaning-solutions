import React, { useState, useEffect } from "react";

const Carousel = ({ items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Set up an interval that automatically advances the slide at a specified interval. 
  // Clear the interval when the component unmounts to avoid memory leaks.
  useEffect(() => {
    const slideInterval = setInterval(handleNext, interval);
    return () => clearInterval(slideInterval);
  }, [currentIndex, interval]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={item.image} alt={item.alt} className="h-auto w-full" />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-black shadow-md"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-black shadow-md"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
