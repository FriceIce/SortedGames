import { useSelector } from "react-redux";
import style from "./LoadingScreen.module.css";
import { RootState } from "../../redux/store";

const LoadingScreen = ({
  loader,
  position,
  text,
}: {
  loader: string;
  position: string;
  text?: boolean;
}) => {
  const googleAuth = useSelector((state: RootState) => state.user.googleAuth);
  return (
    <div
      className={`${position} z-10 grid place-items-center h-full w-full bg-midnightBlue`}
    >
      <div className="grid place-items-center gap-4">
        <div className={style[loader]}></div>
        {text && (
          <h1
            className={`text-sm sm:text-base ${
              googleAuth ? "font-semi" : "font-bold"
            }`}
          >
            {googleAuth ? "Connecting to your Google account" : "SORTED GAMES"}
          </h1>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
