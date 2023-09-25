import { FC } from 'react';

const PageTitle: FC<{title: string;}> = ({ title }) => (
  <h2 className="text-3xl font-bold mb-5 max-[992px]:text-2xl">{title}</h2>
);

export default PageTitle;
