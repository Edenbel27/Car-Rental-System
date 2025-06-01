import React from "react";

export const Table: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <table className={`table-auto w-full ${className}`}>{children}</table>
);

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <thead className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
    {children}
  </thead>
);

export const TableRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <tr className="border-b border-gray-300 dark:border-gray-700">{children}</tr>
);

export const TableCell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <td className="px-4 py-2 text-black dark:text-white">{children}</td>;

export const TableBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tbody>{children}</tbody>;
