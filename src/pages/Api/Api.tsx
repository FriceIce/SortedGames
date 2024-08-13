import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useContentIsLoaded from "../../hooks/useContentIsLoaded";

const Api = () => {
  const sidemenu = useSelector((state: RootState) => state.sidemenu).sidemenu;
  useContentIsLoaded();
  return (
    <div
      className={`text-sm lg:text-base p-12 transition-all duration-200 ${
        sidemenu && "lg:ml-[210px]"
      }`}
    >
      <h1>
        Visit{" "}
        <a className="text-[#8870ec]" href="https://www.freetogame.com/api-doc">
          Freetogame.com
        </a>{" "}
        to access the api documentation.
      </h1>
    </div>
  );
};

export default Api;
