import { FC } from 'react';

const PageTitle: FC<{title: string;}> = ({ title }) => (
  <h2 className="text-2xl font-bold mb-5 max-[768px]:mb-4 tracking-tight">{title}</h2>
);

export default PageTitle;
