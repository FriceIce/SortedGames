import { FormValues, UserResponse } from "../definitions";
import { AppDispatch } from "../redux/store";

type Option = {
  method: string;
  headers: { "Content-Type": string; Authorization: string };
  body?: string;
};

const fetchUserData = async (
  url: string,
  dispatch: AppDispatch | React.Dispatch<React.SetStateAction<any>>,
  option?: Option | null,
  body?: FormValues
) => {
  try {
    const response = await fetch(
      url,
      option
        ? option
        : {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
    );

    if (!response.ok && !url.includes("user")) {
      const data: { message: string } = await response.json();
      alert(data.message);
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as UserResponse;
    dispatch({ type: "user/setUserState", payload: data.user });

    // console.log(data.user);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserData;
