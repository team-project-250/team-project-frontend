import type React from 'react';
import './Button.scss';

type Props = {
  className?: string;
};

export const Button: React.FC<Props> = ({ className = '' }) => {
  return (
    <button type="button" className={`button ${className}`}>
      Обрати техніку
    </button>
  );
};
