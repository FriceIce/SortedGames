import React from "react";
import Avatar from "../../Components/Avatar";
import SavedGames from "../../Components/SavedGames";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [currentOption, setPickOption] = React.useState<
    "saved games" | "avatars"
  >("saved games");

  const { user } = useSelector((state: RootState) => state.user);
  const { sidemenu } = useSelector((state: RootState) => state.sidemenu);
  return (
    <>
      {user && (
        <div
          className={`space-y-7 transition-all duration-200 ${
            sidemenu && "lg:ml-[277px]"
          }`}
        >
          <div className="h-[300px] flex flex-col justify-end gap-6">
            <div className="flex flex-col items-center gap-5">
              <div className="relative z-[-1] bg-white size-32 rounded-full">
                <img
                  src={user.profileImg}
                  alt="Avocado icon"
                  className="size-full object-contains object-center rounded-full"
                />
                <div className="absolute bottom-[-5px] right-5 bg-white border-black border-[3px] size-7 rounded-full grid place-items-center">
                  <img
                    src="https://www.svgrepo.com/show/513803/add.svg"
                    alt="add symbol"
                    className="size-4 object-contain"
                  />
                </div>
              </div>
              <p className="text-xl font-bold">{user.username}</p>
            </div>
            <div className="flex justify-center items-center gap-10">
              <div
                className="flex flex-col items-center gap-1"
                onClick={() => setPickOption("saved games")}
              >
                <div className="size-[54px] grid place-items-end pb-1">
                  <img
                    src="/SortedGames/icons/saved-games.svg"
                    alt="heart icon"
                    className="size-[px]"
                  />
                </div>
                <p className="text-xs">Saved Games</p>
              </div>
              <div
                className="flex flex-col items-center gap-1"
                onClick={() => setPickOption("avatars")}
              >
                <img
                  src="/SortedGames/images/avatars/withBackground/batman.svg"
                  alt="batman"
                  className="size-[54px]"
                />
                <p className="text-xs">Avatars</p>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-[#7d61ec4f] w-5/6 mx-auto" />

          <div className="space-y-3">
            {currentOption === "avatars" && <Avatar />}
            {currentOption === "saved games" && <SavedGames />}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
