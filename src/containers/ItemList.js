import classNames from "classnames";
import React from "react";

function ItemList({ isDarkBackground, onClose, item }) {
  const popupContentWrapperStyle = classNames(
    "w-[80%] md:w-[60%] lg:w-[50%] h-fit flex items-center justify-center py-8 px-4 bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl flex-col",
    {
      "border-2 rounded-xl border-solid": isDarkBackground,
    },
  );

  return (
    <div className="backdrop-blur-xl flex flex-col justify-end absolute inset-0 z-50 h-full w-full text-buttonText">
      <div className={popupContentWrapperStyle}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 ">No.</th>
              <th className="py-2 ">Description</th>
              <th className="py-2 ">Date</th>
              <th className="py-2 ">Amount</th>
            </tr>
          </thead>
          <tbody>
            {item.map((i, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{i.description}</td>
                <td className="py-2">{i.date}</td>
                <td className="py-2 text-right">₹{i.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-5">
          <button
            className="bg-darkRed text-buttonText px-5 py-2 rounded-md border border-buttonText"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

ItemList.defaultProps = {
  isDarkBackground: false,
};

export default ItemList;
