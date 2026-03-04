import React from 'react';

const UserListHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <h2 className="text-xl font-semibold leading-6 text-[var(--color-text-title)] font-['Outfit',sans-serif]">
        {title}
      </h2>
      <p className="text-base font-normal leading-5 text-[var(--color-neutral-30)]">
        {subtitle}
      </p>
    </div>
  );
};

export default UserListHeader;
