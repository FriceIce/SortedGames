import { useSelector } from "react-redux";
import Games from "../../Components/Games";
import { RootState } from "../../redux/store";

const Home = () => {
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);
  return (
    <>
      <main className={`transition-all ${sidemenu && "lg:ml-[210px]"}`}>
        <Games />
      </main>
    </>
  );
};

export default Home;
