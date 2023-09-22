import { FC } from 'react';
import { Truck } from 'lucide-react';
import Link from 'next/link';

interface ILinkButton {
    href: string;
    label: string;
}

const LinkButton: FC<ILinkButton> = ({ label, href }) => (
  <div className="flex justify-end py-3">
    <Link
      href={href}
      className={'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background '
                + 'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring '
                + 'focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 '
                + 'bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8'}
    >
      <Truck className="mr-2" />
      {label}
    </Link>
  </div>
);

export default LinkButton;
