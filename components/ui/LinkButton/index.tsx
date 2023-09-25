import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface ILinkButton {
    href: string;
    label: string;
    icon?: ReactNode;
    className?: string;
}

const LinkButton: FC<ILinkButton> = ({ label, href, icon, className = '' }) => (
  <div className={clsx('flex justify-end', className)}>
    <Link
      href={href}
      className={'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background '
                + 'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring '
                + 'focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 select-none '
                + 'bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 max-[480px]:!w-full'}
    >
      {icon || null}
      {label}
    </Link>
  </div>
);

export default LinkButton;
