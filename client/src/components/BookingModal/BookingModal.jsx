import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingModal = (props) => {
  const { id } = useParams();
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
//   const userId = localStorage.getItem("userId");
const userId = "64deab24bca44182ba0f6567";
  const showBookingModal = () => {
    props.setShowBookingModal(false);
    setPickupLocation("");
    setPickupTime("");
    setDropOffLocation("");
  };


  const handleSubmit = async (e) => {
    console.log(userId);
    axios
      .post("http://localhost:8000/api/booking/" + userId + "/"+ id, {
        pickup_location: pickupLocation,
        pickup_time: pickupTime,
        dropoff_location: dropOffLocation
      })
      .then((res) => {
        console.log(res.data);
        showBookingModal(e);
      })
      .catch((err) => console.log(err));
  };

  return props.showBookingModal ? (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <h2 class="font-semibold">Book your cab: </h2>
              </div>

              <div class="form-group mt-2">
                <p>
                 Pick-Up Location: 
                </p>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>

            <div class="form-group mt-2">
                <p>
                 Pick-Up Time: 
                </p>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>

            <div class="form-group mt-2">
                <p>
                 Drop-Off Location: 
                </p>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={dropOffLocation}
                onChange={(e) => setDropOffLocation(e.target.value)}
              />
            </div>

            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold bg-indigo-700  text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset ring-gray-30 sm:mt-0 sm:w-auto sm: ml-2"
              >
                Post
              </button>
              <button
                onClick={(e) => {
                  showBookingModal(e);
                }}
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default BookingModal;
