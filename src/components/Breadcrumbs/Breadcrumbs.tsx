import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';
import type React from 'react';
import classNames from 'classnames';

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ items, className }) => {
  return (
    <nav className={classNames('breadcrumbs', className)} aria-label="Breadcrumb">
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
