import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SideMenuButton = () => {
  const { inputfield, sidemenu } = useSelector(
    (state: RootState) => state.sidemenu
  );
  const dispatch = useDispatch();
  return (
    <div className="flex items-center">
      <div
        className="flex flex-col items-center gap-1 w-6 space-y-1"
        onClick={() =>
          dispatch({ type: "sidemenu/setOpenSidemenu", payload: !sidemenu })
        }
      >
        <div
          tabIndex={0}
          aria-label="button"
          className={`space-y-1 w-6 cursor-pointer`}
        >
          <div className="h-[2px] w-5 bg-white rounded-lg"></div>
          <div className="h-[2px] w-5 bg-white rounded-lg ml-1"></div>
          <div className="h-[2px] w-5 bg-white rounded-lg"></div>
        </div>
        <p className="text-xs">Menu</p>
      </div>
    </div>
  );
};

export default SideMenuButton;
