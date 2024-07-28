import React from "react";

export const useDebounce = (value: any, timer: number) => {
  const [debounce, setDebounce] = React.useState(value);

  React.useEffect(() => {
    const timeoutID = setTimeout(() => setDebounce(value), timer);
    return () => clearTimeout(timeoutID);
  }, [value, timer]);

  return debounce;
};
