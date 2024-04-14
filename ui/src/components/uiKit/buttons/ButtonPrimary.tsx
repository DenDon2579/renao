import React, { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
};

const ButtonPrimary = ({ className, children, onClick }: Props) => {
  return (
    <button
      className={
        'transition-colors active:bg-slate-100 p-2 bg-white hover:bg-slate-50 border hover:border-indigo-200 border-slate-200 shadow-sm shadow-slate-100 rounded-md select-none ' +
        (className ? className : '')
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
