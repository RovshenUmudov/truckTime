import { FC } from 'react';
import { ICargo } from '@/types';
import Link from 'next/link';

const CargoItem: FC<{data: ICargo;}> = ({ data }) => (
  <Link href={`/cargo/${data._id}`} className="border rounded-md p-5">
    <div>{data.title}</div>
  </Link>
);

export default CargoItem;
