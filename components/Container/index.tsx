import { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="container mx-auto p-5">
    {children}
  </div>
);

export default Container;
