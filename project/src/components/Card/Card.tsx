import React from 'react';
import { CardProps } from './types';

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white p-8 rounded-lg shadow-md ${className}`}>
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>}
      {children}
    </div>
  );
}