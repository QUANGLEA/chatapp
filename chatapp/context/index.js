import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(trackPosition);
    } else {
      alert("geolocation is not supported in your browser.");
    }
  };

  const trackPosition = async (position) => {
    const { latitude, longitude } = position.coords;
    const params = {
      access_key: "dd7b7556958171486480a5c5ea90887b",
      query: latitude + "," + longitude,
    };
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=ad8e534268eb43c8ae5e824fb94a5be7`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        const properties = res.features[0].properties;
        const city = properties.city;
        const state_code = properties.state_code;
        setUserLocation(city + ", " + state_code);
      })
      .catch((error) => console.log("error", error));
  };

  const value = {
    username,
    setUsername,
    password,
    setPassword,
    userLocation,
    setUserLocation,
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
