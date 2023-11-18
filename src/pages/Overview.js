import React, { useState } from "react";
import classNames from "classnames";

import { TransactionPill } from "../components/TransactionPill";
import Popup from "../components/Popup";
import ItemList from "../containers/ItemList";

export function OverView() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [isShowTransactions, setIsShowTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isExpensePopupOpen, setIsExpensePopupOpen] = useState(false);
  const [isIncomePopupOpen, setIsIncomePopupOpen] = useState(false);

  const options = [
    "Select type",
    "Food",
    "Travel",
    "Income",
    "Medical",
    "Dept",
  ];

  const handleDescription = (event) => {
    const currentDescription = event.target.value;
    setDescription(currentDescription);
  };

  const handleAmount = (event) => {
    const currentAmount = event.target.value;
    setAmount(currentAmount);
  };

  const handleDate = (event) => {
    const currentDate = event.target.value;
    setDate(currentDate);
  };

  const handleAdd = () => {
    if (description && amount && date !== "") {
      const updatedTransactions = [
        ...transactions,
        { amount, description, date },
      ];

      setTransactions(updatedTransactions);
      setIsShowTransactions(true);
      setShowErrorMessage(false);
      setAmount("");
      setDate("");
      setDescription("");
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleOpenPopup = () => {
    setIsPopUpOpen(true);
  };

  const totalIncome = transactions.reduce((cost, curr) => {
    if (curr.description === "Income") {
      return Number(cost) + Number(curr.amount);
    }
    return cost;
  }, 0);

  const totalExpense = transactions.reduce((cost, curr) => {
    if (curr.description !== "Income") {
      return Number(cost) + Number(curr.amount);
    }
    return cost;
  }, "0");

  const expenseList = transactions.filter(
    (item) => item.description !== "Income",
  );

  const incomeList = transactions.filter(
    (item) => item.description === "Income",
  );

  const balance = totalIncome - totalExpense;

  const isLowBalance = balance <= 0;
  const correctBalance = Math.abs(balance);

  const balanceButtoncontainer = classNames(
    "w-full h-[5vh] shadow-md flex justify-between flex-row px-4 items-center rounded-md text-text",
    { "bg-darkRed": isLowBalance, "bg-darkGreen": !isLowBalance },
  );

  function handleClearTransactions() {
    setTransactions([]);
    setIsPopUpOpen(false);
  }

  function handleClosePopup() {
    setIsPopUpOpen(false);
  }

  function handleExpensePopup() {
    setIsExpensePopupOpen(true);
  }

  function handleCloseExpensePopup() {
    setIsExpensePopupOpen(false);
  }

  function handleIncomePopup() {
    setIsIncomePopupOpen(true);
  }

  function handleCloseIncomePopup() {
    setIsIncomePopupOpen(false);
  }

  return (
    <div className="flex items-center flex-col gap-1 relative">
      <span className="font-semibold text-xl text-primary">
        Expense Tracker
      </span>
      <div className=" flex flex-col items-center bg-secondary h-[70vh] w-[90vw] rounded-t-md shadow-2xl mt-4 pt-4 px- gap-10 pb-8 min-h-[10vh]">
        <div className="flex flex-col items-center gap-y-2 relative">
          <input
            type="number"
            className="border-none outline-none w-[81VW] h-[4vh] bg-background shadow-xl text-lg text-text placeholder:text-text px-2 rounded-sm"
            placeholder="Amount"
            value={amount}
            onChange={handleAmount}
          />
          <select
            onChange={handleDescription}
            value={description}
            className="w-full h-[4vh] bg-background outline-none rounded-sm text-lg text-text"
          >
            {options.map((option) => (
              <option
                value={option}
                className="border-none rounded-xl outline-none text-lg text-text"
              >
                {option}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border-none outline-none w-[81vw] h-[4vh] bg-background shadow-xl text-lg text-text placeholder:text-text px-2 rounded-sm"
            value={date}
            onChange={handleDate}
            onKeyDown={handleDate}
            placeholder="please select date"
            onClick={handleDate}
          />
          <button
            type="button"
            className="bg-background px-5 py-2 rounded-[25px] shadow-2xl text-sm font-bold w-[70%] text-primary"
            style={{ WebkitTapHighlightColor: "transparent" }}
            onClick={handleAdd}
          >
            Add Transactions
          </button>
          {showErrorMessage && (
            <p className="text-darkRed absolute inset-0 top-44 text-center text-sm">
              *Please fill blanks
            </p>
          )}
        </div>
        <p className=" underline underline-offset-4 mb-[-10px]">
          Transactions history
        </p>
        <div className="flex flex-col text-center w-full min-h-[25vh] overflow-y-scroll px-4 shadow-inner">
          <div className="flex flex-col gap-3">
            {isShowTransactions &&
              transactions.map((item) => {
                const isIncome = item.description === "Income";
                return (
                  <TransactionPill
                    description={item.description}
                    amount={item.amount}
                    date={item.date}
                    key={item.amount}
                    isIncome={isIncome}
                  />
                );
              })}
          </div>
        </div>
        <button
          type="button"
          className="bg-darkRed px-5 py-2 rounded-[25px] shadow-2xl text-sm font-bold w-[70%] text-primary"
          style={{ WebkitTapHighlightColor: "transparent" }}
          onClick={handleOpenPopup}
        >
          Clear Transactions
        </button>
      </div>
      <div className=" bg-secondary h-[19vh] w-[90vw] flex flex-col px-4 gap-2 rounded-b-md items-center pt-4">
        <button
          type="button"
          disabled={!incomeList.length}
          onClick={handleIncomePopup}
          className="w-full bg-background h-[4vh] shadow-md rounded-sm flex justify-between flex-row pt-2 px-4 items-center text-text"
        >
          <p>Total Income</p>
          <p className="text-base font-semibold">₹{totalIncome}</p>
        </button>
        <button
          type="button"
          disabled={!expenseList.length}
          onClick={handleExpensePopup}
          className="w-full bg-background h-[4vh] shadow-md rounded-sm flex justify-between flex-row px-4 items-center text-text"
        >
          <p>Total Expense</p>
          <p className="text-base font-semibold">₹{totalExpense}</p>
        </button>
        <div className={balanceButtoncontainer}>
          <p className="text-lg font-medium">Balance</p>
          <p className="text-lg font-semibold">₹{correctBalance}</p>
        </div>
      </div>
      {transactions.length && isPopUpOpen && (
        <Popup
          onClose={handleClosePopup}
          onProceed={handleClearTransactions}
          text={"Are you sure to clear all transactions"}
          isDarkBackground
        />
      )}
      {expenseList.length && isExpensePopupOpen && (
        <ItemList
          item={expenseList}
          onClose={handleCloseExpensePopup}
          isDarkBackground
        />
      )}
      {incomeList.length && isIncomePopupOpen && (
        <ItemList
          item={incomeList}
          onClose={handleCloseIncomePopup}
          isDarkBackground
        />
      )}
    </div>
  );
}
