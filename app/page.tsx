import { FC } from 'react';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Container from '@/components/Container';
import LinkButton from '@/components/ui/LinkButton';
import CargoList from '@/components/CargoList';
import { Truck } from 'lucide-react';

const Home: FC = () => (
  <>
    <Header />
    <Container>
      <Banner src="/banner-5.jpg" />
      <LinkButton
        label="New Cargo Transportation"
        href="/cargos/new"
        icon={<Truck className="mr-2" />}
        className="mb-4"
      />
      <CargoList limit={6} title="Recent cargo transportation" />
    </Container>
  </>
);

export default Home;
