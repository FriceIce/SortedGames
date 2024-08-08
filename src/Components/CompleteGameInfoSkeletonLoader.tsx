const CompleteGameInfoSkeletonLoader = () => {
  return (
    <div className=" md:flex md:gap-6 md:space-y-0 max-w-[550px] mx-auto 2xl:mx-auto py-4 px-5 space-y-10  md:max-w-[1538px] animate-pulse">
      <div className="flex-[2] max-w-[600px]">
        <div className="space-y-4 w-full">
          <div className="w-full rounded-md shadow h-[170px] sm:h-[230px]"></div>
          <div className="flex justify-between text-center">
            <div className="inline-block shadow w-[20%] py-2 rounded-md h-10"></div>
            <div className="h-10 shadow w-[70%] rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="flex-[3] space-y-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-8 w-[60%] rounded-md shadow"></div>
            <div className="size-6 shadow rounded-md"></div>
          </div>
          <div>
            <article
              className={`space-y-2 overflow-hidden h-40 w-[90%] rounded-md shadow`}
            ></article>
          </div>
        </div>
        <div className="w-full text-xs max-w-[568px]">
          <div className="text-xl h-8 w-4/6 shadow rounded-md mb-4"></div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 w-2/6 rounded-md shadow"></div>
            <div className="flex-1 my-1 space-y-1 h-4 w-2/6 rounded-md shadow"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 w-2/6 rounded-md shadow"></div>
            <div className="flex-1 my-1 space-y-1 h-4 w-2/6 rounded-md shadow"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 w-2/6 rounded-md shadow"></div>
            <div className="flex-1 my-1 space-y-1 h-4 w-2/6 rounded-md shadow"></div>
          </div>
        </div>
        <div className="w-full text-xs max-w-[568px]">
          <div className="text-xl h-8 w-4/6 shadow rounded-md mb-4"></div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 max-w-52 rounded-md shadow"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 max-w-52 rounded-md shadow"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 max-w-52 rounded-md shadow"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 max-w-52 rounded-md shadow"></div>
          </div>
        </div>

        <ul className="flex gap-5 flex-wrap">
          <li className="flex-1 gap-5 shadow rounded-xl size-44"></li>
          <li className="flex-1 gap-5 shadow rounded-xl size-44"></li>
          <li className="flex-1 gap-5 shadow rounded-xl size-44"></li>
        </ul>
      </div>
    </div>
  );
};

export default CompleteGameInfoSkeletonLoader;
