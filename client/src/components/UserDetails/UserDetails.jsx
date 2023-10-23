import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDetails.css";
import ReviewModal from "../ReviewModal/ReviewModal";
import BookingModal from "../BookingModal/BookingModal";
import DriverModal from "../DriverModal/DriverModal";
import { useParams } from "react-router-dom";
import User from "../../images/user_747376.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";

const UserDetails = () => {
  const { id } = useParams();
  const [drivers, setDrivers] = useState([]);
  const [companyDrivers, setCompanyDrivers] = useState([]);
  const [driver, setDriver] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [status, setStatus] = useState("");


  const showReview = () => {
    setShowReviewModal(true);
  };
  
  const showBooking = () => {
    setShowBookingModal(true);
  };

  const showDriverRequest = () => {
    setShowDriverModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/drivers")
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {
        console.log("errori se di" + err);
      });

    axios
      .get("http://localhost:8000/api/driver/" + id)
      .then((res) => {
        setDriver(res.data);
      })
      .catch((err) => {
        console.log("errori se di" + err);
      });

    axios
      .get("http://localhost:8000/api/user/" + id)
      .then((res) => {
        console.log("roli" + res.data.status)
        setStatus(res.data.status);
        setAdmin(res.data);
      })
      .catch((err) => {
        console.log("errori se di" + err);
      });

    axios
      .get("http://localhost:8000/api/user")
      .then((res) => {
        setAdmins(res.data.user);
      })
      .catch((err) => {
        console.log("errori se di" + err);
      });

    axios
      .get("http://localhost:8000/api/review/" + id)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log("errori se di" + err);
      });

      axios
      .get("http://localhost:8000/api/companyDrivers/" + id)
      .then((res) => {
        setCompanyDrivers(res.data);
      })
      .catch((err) => {
        console.log("errori se di" + err);
      });
  }, []);

  const companies = admins.filter((user) => user.status === "Admin");
  // const selectedDrivers = drivers.filter((driver) => driver.company.toString() === id);

  return (
    <div className="container d-flex ">
      
        {status === "Driver" ? 
        <div className="profileTable ">
        <div className="top-profile-bar d-flex align-items-center p-10">
          <img src={User} alt="Companies" />
          <div className="user-info">
            <h3 class="font-bold text-l mb-2">
              {driver.firstName} {driver.lastName}
            </h3>
            {driver.firstName && driver.company && (
              <h3>
                {" "}
                {driver.company.firstName} {driver.company.lastName}
              </h3>
            )}
            <h3>{driver.car_info}</h3>
            <h3>Tirane, Albania</h3>
          </div>
          <button onClick={(e) => {
               showBooking(e);
              }}>Send a booking request</button>
        </div>

        <div className="bottom-profile-bar p-6">
          <div className="d-flex align-items-center justify-content-between mb-5 mx-4">
            <p class="font-bold text-xl mb-2 ">Reviews</p>
            <button
              onClick={(e) => {
               showReview(e);
              }}
            >
              Leave a Review <FontAwesomeIcon icon={faPen} />
            </button>
          </div>
          {reviews.map((review, index) => (
            <div
              className="review-info d-flex align-items-center mb-5 "
              key={index}
            >
              <img src={User} alt="ProfilePhoto" />
              <div>
                <h3 class="font-bold text-l mb-2">{review.user.firstName} </h3>
                <h3>{review.comment}</h3>
              </div>
              <h3>
                {review.rating === 1 ? (
                  <Rating name="read-only" value={1} readOnly />
                ) : review.rating === 2 ? (
                  <Rating name="read-only" value={2} readOnly />
                ) : review.rating === 3 ? (
                  <Rating name="read-only" value={3} readOnly />
                ) : review.rating === 4 ? (
                  <Rating name="read-only" value={4} readOnly />
                ) : review.rating === 5 ? (
                  <Rating name="read-only" defaultValue={5} readOnly />
                ) : (
                  " "
                )}
              </h3>
            </div>
          ))}
        </div> 
        </div>
        : 
        <div className="profileTable ">
        <div className="top-profile-bar d-flex align-items-center p-10">
          <img src={User} alt="Companies" />
          <div className="user-info">
            <h3 class="font-bold text-l mb-2">
              {admin.firstName} {admin.lastName}
            </h3>
            <h3>Tirane, Albania</h3>
          </div>
          <button onClick={(e) => {
               showDriverRequest(e);
              }}>Request to be a driver</button>
        </div>

        <div className="bottom-profile-bar p-6">
            <p class="font-bold text-xl mb-2 ">All drivers in {admin.firstName} company</p>
          {companyDrivers.map((driver, index) => (
            <div className="card text-center" key={index}>
              <div class="max-w-sm rounded overflow-hidden ">
                <img
                  src={User}
                  alt="Driver"
                />
                <div class="px-2 py-3">
                  <div class="font-bold text-l mb-2">{driver.firstName}</div>
                  <p class="text-gray-700 text-base">
                  {driver.company.firstName} {driver.company.lastName}
                  </p>
                </div>
              </div>
          </div>
          ))}
        </div> 
        </div>}
        
    
      <div className="sideTables">
        <div className="side-table">
          <h1 class="driver-title font-bold text-l mb-2">
            Other Drivers Available
          </h1>
          {drivers.map((driver, index) => (
            <div className="side-info" key={index}>
              <div className="d-flex align-items-center">
                <img src={User} alt="Companies" />
                <div>
                  <p class="font-bold text-l mb-2">{driver.firstName}</p>
                  <p>
                    {driver.company.firstName} {driver.company.lastName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="side-table">
          <h1 class="driver-title font-bold text-l mb-2">Companies</h1>
          {companies.map((company, index) => (
            <div className="side-info" key={index}>
              <div className="d-flex align-items-center">
                <img src={User} alt="Companies" />
                <div class="font-bold text-l mb-2">{company.firstName}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReviewModal showReviewModal={showReviewModal} setShowReviewModal={setShowReviewModal} />
      <BookingModal showBookingModal={showBookingModal} setShowBookingModal={setShowBookingModal}/>
      <DriverModal showDriverModal={showDriverModal} setShowDriverModal={setShowDriverModal}/>
    </div>
  );
};

export default UserDetails;
