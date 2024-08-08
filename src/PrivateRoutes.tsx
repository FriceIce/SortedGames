import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const PrivateRoutes = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return user ? <Outlet /> : <Navigate to={"/SortedGames/sign-in"} />;
};

export default PrivateRoutes;
