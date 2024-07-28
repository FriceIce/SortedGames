const GameCardSkeletonLoader = () => {
  return (
    <div className="bg-[#1e232d] h-[331px] w-[253px] border-[2px] flex-none border-gray-500 rounded-xl space-y-5 animate-pulse">
      <div className="bg-skeletonColor h-[153px] w-full rounded-t-xl border-b-[2px] border-gray-500" />
      <div className="mx-3 space-y-5">
        <div className="flex justify-between items-center">
          <div className="bg-skeletonColor h-4 w-3/6 rounded-lg border-[2px] border-gray-500" />
          <div className="bg-skeletonColor h-6 w-[27px] rounded-md border-[2px] border-gray-500" />
        </div>
        <div className="bg-skeletonColor h-4 w-full rounded-lg border-[2px] border-gray-500" />
        <div className="bg-skeletonColor h-4 w-4/6 rounded-lg border-[2px] border-gray-500" />
      </div>
    </div>
  );
};

export default GameCardSkeletonLoader;
