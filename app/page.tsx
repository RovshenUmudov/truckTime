import { FC } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import NewCargo from '@/components/NewCargo';

const Home: FC = () => (
  <>
    <Header />
    <main className="container mx-auto py-5">
      <Banner src="/banner.jpg" />
      <NewCargo />
    </main>
  </>
);

export default Home;
