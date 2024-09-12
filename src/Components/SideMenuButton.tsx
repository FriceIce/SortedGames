import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SideMenuButton = () => {
  const { sidemenu } = useSelector((state: RootState) => state.sidemenu);
  const dispatch = useDispatch();
  return (
    <div
      tabIndex={0}
      aria-label="button"
      className={`space-y-[5px] sm:space-y-[7px] w-8 sm:w-12 cursor-pointer`}
      onClick={() =>
        dispatch({ type: "sidemenu/setOpenSidemenu", payload: !sidemenu })
      }
    >
      <div className="h-[2px] w-6 sm:w-10 bg-white rounded-lg mx-auto"></div>
      <div
        className={`h-[2px] w-6 sm:w-10 bg-white rounded-lg transition-all duration-200 ${
          sidemenu && "ml-[8px]"
        }`}
      ></div>
      <div className="h-[2px] w-6 sm:w-10 bg-white rounded-lg mx-auto"></div>
    </div>
  );
};

export default SideMenuButton;
