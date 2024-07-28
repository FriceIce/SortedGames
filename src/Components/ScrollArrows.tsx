import { ReactNode } from "react";

const ScrollArrows = ({
  children,
  showArrows,
  prevSlide,
  nextSlide,
}: {
  children: ReactNode;
  showArrows: boolean;
  prevSlide: () => void;
  nextSlide: () => void;
}) => {
  // const desktop = useMediaQuery("(min-width: 1024px)"); // reusable hook for media queries.

  return (
    <div className="relative">
      {showArrows && (
        <>
          <div
            className="absolute z-[1] top-1/2 translate-y-[-50%] left-4 grid place-items-center h-[50px] rounded-full w-[50px] bg-[#10172067] cursor-pointer transition-all duration-200 hover:bg-[#000000d2]"
            onClick={prevSlide}
          >
            <img
              src="/icons/chevron-left.svg"
              alt="chevron left arrow"
              className="size-8"
            />
          </div>
          <div
            className="absolute z-[1] top-1/2 translate-y-[-50%] right-1 grid place-items-center h-[50px] rounded-full w-[50px]  bg-[#10172067]  cursor-pointer transition-all duration-200 hover:bg-[#000000d2]"
            onClick={nextSlide}
          >
            <img
              src="/icons/chevron-right.svg"
              alt="chevron left arrow"
              className="size-10"
            />
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export default ScrollArrows;
