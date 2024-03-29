import { useEffect, useState } from "react";

const useIsDragging = () => {
  const [dragCounter, setDragCounter] = useState(0);

  useEffect(() => {
    function dragEnterHandler() {
      setDragCounter((prevCounter) => prevCounter + 1);
    }
    function dragLeaveHandler() {
      setDragCounter((prevCounter) => prevCounter - 1);
    }
    function dropHandler() {
      setDragCounter(0);
    }

    window.addEventListener("drop", dropHandler);
    window.addEventListener("dragenter", dragEnterHandler);
    window.addEventListener("dragleave", dragLeaveHandler);

    // clean up
    return () => {
      window.removeEventListener("drop", dropHandler);
      window.removeEventListener("dragenter", dragEnterHandler);
      window.removeEventListener("dragleave", dragLeaveHandler);
    };
  }, []);

  return dragCounter > 0;
};

export default useIsDragging;
