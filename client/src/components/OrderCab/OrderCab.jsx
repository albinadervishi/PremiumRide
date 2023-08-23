import React, {useState, useEffect} from "react";
import axios from "axios";
import "./OrderCab.css";
import { Link } from "react-router-dom";
import User from "../../images/user_747376.png";
import Arrow from "../../images/right-arrow.png";

import { Rating } from '@mui/material';

const OrderCab = () => {
    const [user, setUser] = useState ([]);
    const [drivers, setDrivers] = useState ([]);

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/user")
          .then((res) => {
            setUser(res.data.user);
          })
          .catch((err) => {
            console.log("errori se di" + err);
          });

          axios
          .get("http://localhost:8000/api/drivers")
          .then((res) => {
            console.log(res.data);
            setDrivers(res.data);
          })
          .catch((err) => {
            console.log("errori se di" + err);
          });
      }, []);

      const companies = user.filter((user) => user.status === "Admin");

  return (
    <div className="container d-flex ">
      <div className="companiesTable">
        <h1 class="driver-title font-bold text-l mb-2">Companies</h1>
        {companies.map((company, index) => (
        <div className="company-info" key={index}>
            <div className="d-flex align-items-center">
        <img
                  src={User}
                  alt="Companies"
                />
                <div class="font-bold text-l mb-2">{company.firstName}</div>

        </div>
        <img src={Arrow}/>
        </div>
))}
      </div>

      <div className="driverTable">
        <h1 class="driver-title font-bold text-l mb-2">Available Drivers</h1>
        <div className="row my-2 d-flex">
            {drivers.map((driver, index)=>( 
                <div className="card text-center" key={index}>
            <Link to={"/driver-company/" + driver._id}>
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
                  <Rating name="size-small" defaultValue={5} size="small" readOnly/>
                </div>
              </div>
            </Link>
          </div>
            ) )}

        </div>
      </div>
    </div>
  );
};

export default OrderCab;
