import react, { useState, useEffect } from "react";

const axios = require("axios");

const useGetData = (item, showActive, count) => {
  const [dataDetalle, setDataDetalle] = useState(null);
  const [loadingHooks, setLoadingHooks] = useState(false);

  useEffect(() => {
    setLoadingHooks(true);
    axios
      .get(`http://localhost:3001/genres`)
      .then(function (response) {
        const { data } = response;
        setDataDetalle(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setLoadingHooks(false);
      });
  }, [item, showActive, count]);
  return [dataDetalle, loadingHooks];
};

export default useGetData;
