import { AppDispatch } from "../redux/store";

export const fetchGames = async (
  url: string,
  options?: any,
  dispatch?: React.Dispatch<React.SetStateAction<any>> | AppDispatch
) => {
  try {
    const response = await fetch(url, options && options);

    if (!response.ok) return console.log(response.status, response.statusText);

    const json = await response.json();

    if (dispatch) dispatch(json);

    // console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};
