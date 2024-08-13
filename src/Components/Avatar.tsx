import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { AvatarWithBackground } from "../definitions";
import { updateAvatar } from "../firebase/firebase";
import { fetchGames } from "../modules/fetchGames";
import { RootState } from "../redux/store";

const Avatar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  // const [data, setData] = React.useState<AvatarWithBackground>({
  //   withBackground: [],
  // });

  const { data, isLoading } = useQuery<AvatarWithBackground>({
    queryKey: ["Avatars"],
    queryFn: () =>
      fetchGames("/SortedGames/database/avatars/avatars.json", null),
  });

  // ANVÄND REACT QUERY
  // React.useEffect(() => {
  //   fetchGames("/SortedGames/database/avatars/avatars.json", null, setData);
  // }, []);

  const setProfileImg = (avatarSrc: string | null) => {
    if (!user || !avatarSrc) return;
    updateAvatar(user.userId, avatarSrc);
  };
  return (
    <>
      {user && (
        <>
          <h1 className="text-2xl font-bold text-center">Pick your avatar</h1>
          <div className="flex justify-center">
            <ul className="w-full avatar-grid px-3 py-3">
              {!isLoading &&
                data &&
                data.withBackground.map((avatar) => {
                  const currentAvatar =
                    avatar.src === user.profileImg && avatar.src; // returns true or false
                  // if(currentAvatar) setProfileImg(currentAvatar);
                  return (
                    <li
                      key={avatar.id}
                      className={`flex-1 flex flex-col gap-2 items-center text-nowrap p-2 border-2 rounded-xl transition-all cursor-pointer hover:border-[#7d61ec] ${
                        currentAvatar
                          ? "border-[#7d61ec]"
                          : "border-transparent"
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
