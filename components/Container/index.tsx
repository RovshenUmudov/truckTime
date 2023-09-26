import { FC, PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Container: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <div className="container mx-auto p-5 max-[768px]:p-3 grow">
      {children}
    </div>
    <Footer />
  </>
);

export default Container;
