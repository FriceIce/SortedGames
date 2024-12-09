import { useEffect, useState } from "react";

const useImagePreloader = (imgUrls: string[]) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    const loadImages = async () => {
      const promises = imgUrls.map((url) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => reject();
        });
      });

      // The reason for .allSeattled() and not .all() is beacuse I don't wont the app to crash if one or two images fail to upload.
      await Promise.allSettled(promises);

      if (isCancelled) {
        return setIsLoaded(true);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [imgUrls]);

  return isLoaded;
};

export default useImagePreloader;
