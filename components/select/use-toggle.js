import React from 'react';

export default function useToggle(initiallyActive) {
  const [isActive, setIsActive] = React.useState(initiallyActive);
  const toggle = () => setIsActive(isActive => !isActive);

  return [isActive, toggle, setIsActive];
}
