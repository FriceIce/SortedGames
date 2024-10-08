import React from "react";
import { userStatus } from "../firebase/firebase";
import { useDispatch } from "react-redux";

export const useCheckUserState = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timeoutID = setTimeout(() => userStatus(dispatch), 0);
    return () => clearTimeout(timeoutID);
  }, []);
  return;
};
