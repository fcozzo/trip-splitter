import React, { ComponentProps } from 'react';

type TextInputProps = {
  label: string;
} & ComponentProps<'input'>;

export function TextInput({ label, ...delegated }: TextInputProps) {
  const id = React.useId();

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input {...delegated} id={id} type="text" />
    </>
  );
}
