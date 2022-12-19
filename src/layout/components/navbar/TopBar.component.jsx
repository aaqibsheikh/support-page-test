import React from 'react';
import UserTop from './UserTop.component';
import Logo from './Logo.component';

export function TopBar({ hide = false, hideSide, toggleSide }) {
  return (
    <div className="h-20 w-full bg-custom-secondary flex items-center justify-between ">
      <Logo hide={hide} hideSide={hideSide} toggleSide={toggleSide} />
      <UserTop />
    </div>
  );
}
