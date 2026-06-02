import React from 'react';

/** Google Sans accent inside an otherwise EB Garamond heading. */
export function SansEmphasis({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={['heading-sans', className].filter(Boolean).join(' ')}>{children}</span>;
}
