import React from "react";

const useScrollToTop = (dependency: any) => {
  React.useEffect(() => {
    //This line makes sure that the page is loaded at the top of the page. sub_root is in the app component.
    const subRoot = document.getElementById("sub_root") as HTMLDivElement;
    subRoot.scrollTo(0, 0);
  }, dependency);
};

export default useScrollToTop;
