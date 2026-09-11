import type React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
};

export const Button: React.FC<Props> = ({ className = '' }) => {
  return (
    <Link to="/catalog" className={`button text ${className}`}>
      Обрати техніку
    </Link>
  );
};
