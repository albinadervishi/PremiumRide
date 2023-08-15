import React from 'react';
import { Link } from 'react-router-dom';
import banner from "../../images/banner1.jpg";
import './Banner.css';

const Banner = () => {
    return (
<section className="banner d-flex align-items-center justify-content-start">
      <div className="container">
        <div className="img-background">
          <img src={banner}/>
        </div>
        <div className="content">
          <h1>Reliabe and Secure Way to Reach Any Point of the City</h1>
          <h4>We provide affordable and fast way to find a taxi when and where you need it</h4>
          <div className="my-5 mx-auto">
            <Link to="/menu">
              <button className="btn order-btn text-left">Order Now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    )
    
}

export default Banner;