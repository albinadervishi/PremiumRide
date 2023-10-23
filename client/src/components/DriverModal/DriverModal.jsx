import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DriverModal = (props) => {
  const { id } = useParams();
  const [drivingLicense, setDrivingLicense] = useState("");
  const [carInfo, setCarInfo] = useState("");
  //   const userId = localStorage.getItem("userId");
  const userId = "64deab24bca44182ba0f6567";
  const showDriverModal = () => {
    props.setShowDriverModal(false);
    setDrivingLicense("");
    setCarInfo("");
  };

  // const handleFileChange = (e) => {
  //   const img = {
  //     preview: URL.createObjectURL(e.target.files[0]),
  //     data: e.target.files[0],
  //   }
  //   setDrivingLicense(img)
  // };

  // const handleSubmit = async () => {
  //   if (drivingLicense.data && carInfo) {
  //     const formData = new FormData();
  //     formData.append('driving_license', drivingLicense.data);
  //     formData.append('car_info', carInfo);
  
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8000/api/driverRequest/" + userId + "/" + id,
  //         formData
  //       );
  
  //       console.log(response.data.driving_license);
  //       console.log(response.data.car_info);
  //       showDriverModal(); // No need to pass the event object
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    axios
      .post("http://localhost:8000/api/driverRequest/" + userId + "/"+ id, {
        driving_license: drivingLicense,
        car_info: carInfo
      })
      .then((res) => {
        console.log(res.data);
        showDriverModal(e);
      })
      .catch((err) => console.log(err));
  };
  

  return props.showDriverModal ? (
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
                <h2 class="font-semibold">Request to be a driver: </h2>
              </div>

              <form enctype="multipart/form-data">
              {/* <div class="form-group mt-2">
                <p>Driver License:</p>

                {drivingLicense.preview && <img src={drivingLicense.preview} width='100' height='100' />}

                <input
                  type="file"
                  id="file-input"
                  name="driving_license"
                  accept="image/*"
                   onChange={handleFileChange}
                />
              </div> */}

<div class="form-group mt-2">
                <p>Driver License:</p>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.value)}
                />
              </div>

              <div class="form-group mt-2">
                <p>Car Info:</p>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={carInfo}
                  onChange={(e) => setCarInfo(e.target.value)}
                />
              </div>
              </form>
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
                  showDriverModal(e);
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

export default DriverModal;
