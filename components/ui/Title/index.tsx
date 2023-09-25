import { FC } from 'react';

const PageTitle: FC<{title: string;}> = ({ title }) => (
  <h2 className="text-2xl font-bold mb-5 tracking-tight">{title}</h2>
);

export default PageTitle;
