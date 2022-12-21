import React from "react";

const useFetch = (url, method, body) => {
  const [fetchReturn, setFetchReturn] = React.useState({});

  React.useEffect(() => {
    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json; charset=UTF-8",
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchReturn(data);
      });
  }, [body, method, url]);

  return fetchReturn;
};

export default useFetch;
