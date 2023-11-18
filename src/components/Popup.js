import classNames from "classnames";
import React from "react";

function Popup({ isDarkBackground, onProceed, onClose, text }) {
  const popupContentWrapperStyle = classNames(
    "w-[88%] h-fit flex items-center justify-center py-10 px-5 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-larger shadow-xl flex-col",
    {
      "border-2 rounded-xl border-background border-solid":
        isDarkBackground,
    },
  );

  return (
    <div
      data-testid="popup-container"
      className="backdrop-blur-xl flex flex-col justify-end absolute inset-0 z-50 h-full w-full"
    >
      <div
        data-testid="popup-content-wrapper"
        className={popupContentWrapperStyle}
      >
        <div>{text}</div>
        <div className="flex gap-5 mt-5">
          <button
            className="bg-darkRed text-buttonText px-5 rounded-md"
            onClick={onProceed}
          >
            Yes
          </button>
          <button
            className="bg-background text-buttonText px-5 rounded-md"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

Popup.defaultProps = {
  isDarkBackground: false,
};

export default Popup;
