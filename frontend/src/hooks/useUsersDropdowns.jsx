import { useState } from "react";

export default function useUsersDropdowns() {
  const [roleSelector, setRoleSelector] = useState(false);
  const [activeSelector, setActiveSelector] = useState(false);

  const toggleRoleSelector = () => {
    setActiveSelector(false);
    setRoleSelector(prev => !prev);
  }

  const toggleActiveSelector = () => {
    setActiveSelector(prev => !prev);
    setRoleSelector(false);
  }

  return {
    roleSelector,
    toggleRoleSelector,
    activeSelector,
    toggleActiveSelector,
  };
}