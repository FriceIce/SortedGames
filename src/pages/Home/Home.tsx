import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
const Games = lazy(() => import("../../Components/Games"));

const Home = () => {
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);
  return (
    <>
      <Suspense
        fallback={
          <LoadingScreen position="static" loader="smallerLoaderAnimation" />
        }
      >
        <main
          className={`transition-all duration-200 ${
            sidemenu && "lg:ml-[210px]"
          }`}
        >
          <Games />
        </main>
      </Suspense>
    </>
  );
};

export default Home;
