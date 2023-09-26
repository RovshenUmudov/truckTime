import { FC, PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface IContainer extends PropsWithChildren{
    disableHeader?: boolean;
    disableFooter?: boolean;
}

const Container: FC<IContainer> = ({ children, disableHeader = false, disableFooter = false }) => (
  <>
    {!disableHeader ? <Header /> : null}
    <div className="container mx-auto p-5 max-[768px]:p-3 grow">
      {children}
    </div>
    {!disableFooter ? <Footer /> : null}
  </>
);

export default Container;
