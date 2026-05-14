import React from 'react';

export function DateInput({ label, ...delegated }) {
  const id = React.useId();

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...delegated} type="date" />
    </>
  );
}
