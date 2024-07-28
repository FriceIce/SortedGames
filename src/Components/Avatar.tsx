import React from "react";
import { fetchGames } from "../modules/fetchGames";
import { AvatarWithBackground } from "../definitions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import fetchUserData from "../modules/fetchUser";
import { optionsWithBody, userUrl } from "../modules/fetchOptions";
import { useCookies } from "react-cookie";

const Avatar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [currentProfilepic, setcurrentProfilepic] = React.useState<
    string | null
  >(null);
  const [data, setData] = React.useState<AvatarWithBackground>({
    withBackground: [],
  });
  const [cookie, setCookie] = useCookies(["user"]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchGames("/database/avatars/avatars.json", null, setData);
  }, []);

  const setProfileImg = (avatarSrc: string | null) => {
    console.log(avatarSrc);
    if (!user || !avatarSrc) return;

    const option = optionsWithBody(
      "PUT",
      { ...user, profileImg: avatarSrc },
      user.token
    );
    fetchUserData(userUrl("profileImage"), dispatch, option);
    setcurrentProfilepic(avatarSrc);
    setCookie("user", JSON.stringify({ ...user, profileImg: avatarSrc }), {
      path: "/",
      httpOnly: false,
      secure: true,
    });
  };
  return (
    <>
      {user && (
        <>
          <h1 className="text-2xl font-bold text-center">Pick your avatar</h1>
          <div className="flex justify-center">
            <ul className="w-full avatar-grid px-3 py-3">
              {data.withBackground.map((avatar) => {
                const currentAvatar =
                  avatar.src === user.profileImg && avatar.src; // returns true or false
                // if(currentAvatar) setProfileImg(currentAvatar);
                return (
                  <li
                    key={avatar.id}
                    className={`flex-1 flex flex-col gap-2 items-center text-nowrap p-2 border-2 rounded-xl ${
                      currentAvatar ? "border-[#7d61ec]" : "border-transparent"
                    }`}
                    onClick={() => setProfileImg(avatar.src)}
                  >
                    <div className="size-[56px]">
                      <img
                        src={avatar.src}
                        alt={`${avatar.name} icon`}
                        className="size-[56px]"
                      />
                    </div>
                    <p className="text-xs">{avatar.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Avatar;
