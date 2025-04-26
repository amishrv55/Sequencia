import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required CSS

const slides = [
  {
    image: "/images/slide1.jpg",
    headline: "Will India become a 5 Trillion Dollar Economy by 2025?",
    caption: "Top economists weigh in with forecasts",
  },
  {
    image: "/images/slide2.jpg",
    headline: "Can AI solve climate change?",
    caption: "Explore global predictions on green tech",
  },
  {
    image: "/images/slide3.jpg",
    headline: "Will Bitcoin hit $100k this year?",
    caption: "Crypto community is divided",
  },
];

const HeroSlider = () => {
  return (
    <div className="max-w-6xl mx-auto mt-8 rounded overflow-hidden shadow-lg">
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={1000}
      >
        {slides.map((slide, index) => (
          <div key={index} className="h-[50vh]"> {/* Half viewport height */}
            <img 
              src={slide.image} 
              alt={`Slide ${index + 1}`} 
              className="h-full w-full object-cover" 
            />
            <div className="legend">
              <h3 className="text-lg font-semibold">{slide.headline}</h3>
              <p className="text-sm">{slide.caption}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;