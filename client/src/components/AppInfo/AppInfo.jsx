import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AppInfo = ()=> {
    const [fleetVehicles, setFleetVehicles] = useState(0);
    const [drivers, setDrivers] = useState(0);
    const [greatOffers, setGreatOffers] = useState(0);
    const [users, setUsers] = useState(0);
  
    const [ref, inView] = useInView(); 

    useEffect(() => {
      if (inView) {
        const interval = setInterval(() => {
          setFleetVehicles((prevValue) => (prevValue < 250 ? prevValue + 10 : prevValue));
          setDrivers((prevValue) => (prevValue < 20 ? prevValue + 1 : prevValue));
          setGreatOffers((prevValue) => (prevValue < 231 ? prevValue + 10 : prevValue));
          setUsers((prevValue) => (prevValue < 25 ? prevValue + 1 : prevValue));
        }, 30);
  
        return () => clearInterval(interval);
      }
    }, [inView]);
  
    return (
        <div ref={ref} class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-10 lg:px-8">
          <div class="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-gray-600">Fleet vehicles</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {fleetVehicles}
              </dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-gray-600">Drivers</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {drivers}+
              </dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-gray-600">Great Offers</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {greatOffers}
              </dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base leading-7 text-gray-600">Annual Costumers</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {users}K
              </dd>
            </div>
          </div>
        </div>
      </div>
      
    );
}

export default AppInfo;