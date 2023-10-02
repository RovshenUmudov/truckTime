import { FC } from 'react';
import { clsx } from 'clsx';

interface ICargoFeature {
    title: string;
    feature: string | number | null;
    prefix?: string;
    noBorder?: boolean;
}

const CargoFeature: FC<ICargoFeature> = ({
  feature,
  title,
  prefix,
  noBorder = false,
}) => (
  <div className={`grid grid-cols-[auto_1fr] gap-2 w-full 
  ${!noBorder ? 'border-b border-secondary' : ''} pb-2 items-center`}
  >
    <div className="text-sm text-muted-foreground">{`${title}:`}</div>
    <div className={clsx('text-sm justify-self-end', title === 'Type' ? 'capitalize' : '')}>
      {`${feature} ${prefix || ''}`}
    </div>
  </div>
);

export default CargoFeature;
