import { useState } from 'react';

export const useMobileNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  return {
    isNavOpen,
    toggleNav
  };
};