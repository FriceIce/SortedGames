import style from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className="fixed z-10 grid place-items-center h-full w-full bg-midnightBlue">
      <div className={style.loader}></div>
    </div>
  );
};

export default LoadingScreen;
