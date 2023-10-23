import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [driver, setDriver] = useState("User");
  const [status, setStatus] = useState([]);
  const [request, setRequest] = useState([]);
  const [selectedTab, setSelectedTab] = useState("pending");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/" + id)
      .then((res) => {
        setDriver( res.data.status);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("errori se di" + err);
      });


    axios
      .get("http://localhost:8000/api/bookings/" + id)
      .then((res) => {
        console.log("requests", res.data);
        setStatus(res.data.status);
        setRequest(res.data);
      })
      .catch((err) => {
        console.log("errori " + err);
      });
  }, []);

  const declineBookingRequest = (id) => {
    axios
      .delete("http://localhost:8000/api/booking/" + id)
      .then((res) => {
        setRequest(request.filter((request) => request._id !== id));
      })
      .catch((err) => console.log("?" + err));
  };

  const approveBookingRequest = (id) => {
    axios
      .patch("http://localhost:8000/api/booking/" + id, {status})
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log("?" + err));
  };

  const selectedRequests = request.filter(
    (request) => request.booking_status === selectedTab
  );

  return (
    <div className="container">
      <div className="profile-container">
        <div className="profile-details d-flex justify-between flex-wrap">
          <img src={user.img} />
          <div>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
          </div>
          <FontAwesomeIcon icon={faPen} />
        </div>

        <div className="tabs">
          <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 ">
            <ul class="flex flex-wrap -mb-px">
              <li class="mr-2" onClick={() => setSelectedTab("pending")}>
                <span
                  to="pending"
                  className={selectedTab === "pending" ? "active " : "nav-link"}
                >
                  {driver === "Driver" ?
                  <p>Ride Requests</p> : <p>Sent Request</p> }
                </span>
              </li>
              <li class="mr-2" onClick={() => setSelectedTab("accepted")}>
                <span
                  to="accepted"
                  className={
                    selectedTab === "accepted" ? "active " : "nav-link"
                  }
                >
                  <p>Bookings History</p>
                </span>
              </li>
            </ul>
          </div>

          {selectedRequests.map((request, index) => (
            <div className="requests-list d-flex justify-between flex-wrap" key={index}>
              <div >
                <p>Date:</p>
                <p>
                  {new Date(request.createdAt).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p>PickUp Time:</p>
                <p>{request.pickup_time}</p>
              </div>
              <div>
                <p>PickUp Location:</p>
                <p>{request.pickup_location}</p>
              </div>
              <div>
                <p>DropOff Location:</p>
                <p>{request.dropoff_location}</p>
              </div>
              {driver === "Driver" ? 
              <div>
                <p>User:</p>
                <p>{request.user.firstName}</p>
              </div> : 
              <div>
                <p>Driver:</p>
                <p>{request.driver.firstName}</p>
              </div>}
              {driver === "Driver" ? 
              <div >
                <button type="button" class="btn btn-outline-success" onClick={() => approveBookingRequest(request._id)}>Accept</button>
                <button type="button" class="btn btn-outline-danger" onClick={() => declineBookingRequest(request._id)}>Decline</button>
              </div>
               : 
              <button> <button type="button" class="btn btn-outline-danger" onClick={() => declineBookingRequest(request._id)}>Decline</button></button>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
