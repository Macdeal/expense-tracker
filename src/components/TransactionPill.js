import React from "react";

export function TransactionPill({ description, amount, isIncome, date }) {
  const renderStyle = isIncome ? (
    <p className="w-4 h-4 bg-darkGreen rounded-2xl border border-primary border-solid"></p>
  ) : (
    <p className="w-4 h-4 bg-darkRed rounded-2xl border border-primary border-solid"></p>
  );
  return (
    <div className="animate-top flex flex-row justify-between w-full h-[5vh] bg-background rounded-md px-2 items-center shadow-xl text-text">
      <p className="text-lg font-semibold">{description}</p>
      <p className="text-sm">{date}</p>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-lg font-medium">₹{amount}</p>
        {renderStyle}
      </div>
    </div>
  );
}
