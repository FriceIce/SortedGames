import { useSelector } from "react-redux";
import style from "./LoadingScreen.module.css";
import { RootState } from "../../redux/store";

const LoadingScreen = () => {
  const googleAuth = useSelector((state: RootState) => state.user.googleAuth);
  return (
    <div className="fixed z-10 grid place-items-center h-full w-full bg-midnightBlue">
      <div className="grid place-items-center gap-4">
        <div className={style.loader}></div>
        {googleAuth && (
          <h1 className="text-sm sm:text-base">
            Connecting to your Google account
          </h1>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
