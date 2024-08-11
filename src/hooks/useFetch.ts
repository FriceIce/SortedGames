import React from "react";
import { AppDispatch } from "../redux/store";

export const useFetch = (
  url: string,
  options?: any,
  dependencies?: any,
  dispatch?: AppDispatch | React.Dispatch<React.SetStateAction<any>>,
  reduxType?: string,
  dontFetchAgain?: boolean
) => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState<{
    statusText: string;
    status: number;
  }>({ statusText: "", status: 0 });

  React.useEffect(() => {
    const fetchData = async () => {
      if (dontFetchAgain) return; //This is so the application wont refetch the same data.
      try {
        const response = await fetch(url, options && options);

        if (!response.ok)
          return setError({
            statusText: response.statusText,
            status: response.status,
          });

        const json = await response.json();
        // console.log(json);
        setData(json);

        if (dispatch && reduxType) dispatch({ type: reduxType, payload: json });
        if (dispatch && !reduxType) dispatch(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, dependencies);

  return { data, error };
};
