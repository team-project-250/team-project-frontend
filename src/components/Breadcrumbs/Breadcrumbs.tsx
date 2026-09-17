import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';
import type React from 'react';

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span className="breadcrumbs__item" key={item.label}>
          {item.path ? (
            <Link to={item.path} className="breadcrumbs__link text">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}

          {index < items.length - 1 && <span className="breadcrumbs__separator">/</span>}
        </span>
      ))}
    </nav>
  );
};
