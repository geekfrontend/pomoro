import { useState, useRef } from "react";
import Portal from "./Portal";

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

  // Prevent clicks inside the bottom sheet from closing it
  const handleSheetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      <div
        className={`bottom-sheet fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end transition-opacity duration-300 ease-in-out ${
          isBottomSheetOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick} // Clicks on backdrop close the sheet
      >
        <div
          ref={sheetRef}
          className={`bg-white w-full max-w-[480px] rounded-t-lg p-4 transform transition-transform duration-300 ease-in-out ${
            isBottomSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onClick={handleSheetClick} // Prevent clicks inside the sheet from closing it
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

          <h2 className="text-xl font-semibold mb-4">Create New Note</h2>

          <div>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default BottomSheet;
