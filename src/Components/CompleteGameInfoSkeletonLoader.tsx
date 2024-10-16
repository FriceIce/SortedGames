const CompleteGameInfoSkeletonLoader = () => {
  return (
    <div className=" md:flex md:gap-6 md:space-y-0 max-w-[550px] mx-auto 2xl:mx-auto py-4 px-5 space-y-10 md:max-w-[1538px] animate-pulse">
      <section className="flex-[2] max-w-[600px]">
        <div className="space-y-4 w-full">
          <div className="w-full rounded-md shadow border-gray-400 border h-[170px] sm:h-[230px]"></div>
          <div className="flex gap-3 text-center">
            <div className="flex-1 shadow border-gray-400 border w-[20%] py-2 rounded-md h-10"></div>
            <div className="flex-[4] h-10 shadow border-gray-400 border rounded-md"></div>
          </div>
        </div>
      </section>

      <section className="flex-[3] space-y-16">
        <div className="space-y-6 lg:space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-8 lg:h-12 w-[60%] rounded-md shadow border-gray-400 border"></div>
            <div className="size-6 lg:size-7 shadow border-gray-400 border rounded-md"></div>
          </div>
          <div>
            <article
              className={`space-y-2 overflow-hidden h-40 w-[90%] rounded-md shadow border-gray-400 border`}
            ></article>
          </div>
        </div>
        <div className="w-full text-xs max-w-[568px]">
          <div className="text-xl h-8 lg:h-12 w-4/6 shadow border-gray-400 border rounded-md mb-4"></div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 w-2/6 rounded-md shadow border-gray-400 border"></div>
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 w-2/6 rounded-md shadow border-gray-400 border"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 w-2/6 rounded-md shadow border-gray-400 border"></div>
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 w-2/6 rounded-md shadow border-gray-400 border"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 w-2/6 rounded-md shadow border-gray-400 border"></div>
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 w-2/6 rounded-md shadow border-gray-400 border"></div>
          </div>
        </div>
        <div className="w-full text-xs max-w-[568px]">
          <div className="text-xl h-8 lg:h-12 w-4/6 shadow border-gray-400 border rounded-md mb-4"></div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 max-w-52 rounded-md shadow border-gray-400 border"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 max-w-52 rounded-md shadow border-gray-400 border"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 max-w-52 rounded-md shadow border-gray-400 border"></div>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-1 my-1 space-y-1 h-4 lg:h-8 max-w-52 rounded-md shadow border-gray-400 border"></div>
          </div>
        </div>

        <ul className="flex gap-5 flex-wrap">
          <li className="flex-1 h-32 gap-5 shadow border-gray-400 border rounded-xl size-44"></li>
          <li className="flex-1 h-32 gap-5 shadow border-gray-400 border rounded-xl size-44"></li>
          <li className="flex-1 h-32 gap-5 shadow border-gray-400 border rounded-xl size-44"></li>
        </ul>
      </section>
    </div>
  );
};

export default CompleteGameInfoSkeletonLoader;
