import { useState, useRef } from "react";
import Portal from "./Portal";
import PropTypes from "prop-types";

const BottomSheet = ({
  children,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}: {
  children: React.ReactNode;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    setStartY(
      e.nativeEvent instanceof MouseEvent
        ? e.nativeEvent.clientY
        : e.nativeEvent.touches[0].clientY
    );
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;

    const newY =
      e.nativeEvent instanceof MouseEvent
        ? e.nativeEvent.clientY
        : e.nativeEvent.touches[0].clientY;
    const deltaY = newY - startY;
    setCurrentY(deltaY);

    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${Math.max(0, deltaY)}px)`;
    }
  };

  const handleDragEnd = () => {
    setDragging(false);

    if (currentY > 5) {
      setIsBottomSheetOpen(false);
    }

    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }

    setCurrentY(0);
  };

  // Handle clicks on the backdrop
  const handleBackdropClick = () => {
    setIsBottomSheetOpen(false);
  };

  const handleSheetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      <div
        className={`bottom-sheet fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-end transition-opacity duration-300 ease-in-out ${
          isBottomSheetOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick}
      >
        <div
          ref={sheetRef}
          className={`bg-white w-full  dark:bg-gray-800  max-w-[480px] rounded-t-lg p-4 transform transition-transform duration-300 ease-in-out ${
            isBottomSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onClick={handleSheetClick}
        >
          <div className="w-12 h-1.5 bg-gray-400 rounded-full mx-auto mb-4"></div>

          <h2 className="mb-4 text-xl font-semibold">Create New Note</h2>

          <div>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

BottomSheet.propTypes = {
  children: PropTypes.node.isRequired,
  isBottomSheetOpen: PropTypes.bool.isRequired,
  setIsBottomSheetOpen: PropTypes.func.isRequired,
};

export default BottomSheet;
