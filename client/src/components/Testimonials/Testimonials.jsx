import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";

const Testimonials = () => {
  const carouselSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...carouselSettings}>
        <div className="carousel-item">
            <h1>John Doe</h1>
            <h1>Regular Client</h1>
          <h1>
            I found your service to be a 5-star experience. Our flight was
            delayed by two hours, so we arrived at the airport at 2am. However,
            the driver was waiting at the arrivals hall for us, when we finally
            got there. All the people we communicated with were pleasant and
            cheerful.
          </h1>
        </div>

        <div className="carousel-item">
            <h1>Brittany</h1>
            <h1>Regular Client</h1>
          <h1>
            I found your service to be a 5-star experience. Our flight was
            delayed by two hours, so we arrived at the airport at 2am. However,
            the driver was waiting at the arrivals hall for us, when we finally
            got there. All the people we communicated with were pleasant and
            cheerful.
          </h1>
        </div>

        <div className="carousel-item">
            <h1>Josh</h1>
            <h1>Regular Client</h1>
          <h1>
            I found your service to be a 5-star experience. Our flight was
            delayed by two hours, so we arrived at the airport at 2am. However,
            the driver was waiting at the arrivals hall for us, when we finally
            got there. All the people we communicated with were pleasant and
            cheerful.
          </h1>
        </div>
        
      </Slider>
    </div>
  );
};

export default Testimonials;
