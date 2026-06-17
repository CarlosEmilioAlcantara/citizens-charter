import { useState } from "react";

export default function useTransactionSelector() {
  const [transactionSelector, setTransactionSelector] = useState(false);

  const toggleTransactionSelector = () => {
    setTransactionSelector(prev => !prev);
  }

  return {transactionSelector, toggleTransactionSelector};
}