import { FC } from 'react';
import Banner from '@/components/Banner';
import Container from '@/components/Container';
import LinkButton from '@/components/ui/LinkButton';
import CargoList from '@/components/CargoList';
import { Truck } from 'lucide-react';

const Home: FC = () => (
  <Container>
    <Banner src="/banner-home.jpg" />
    <div className="border rounded-md p-5 mb-10 grid grid-cols-2 max-[768px]:grid-cols-1
       items-center gap-5 justify-between max-[768px]:text-center max-[768px]:mb-5"
    >
      <p className="text-muted-foreground">Create new cargo transportation:</p>
      <LinkButton label="Create New" href="/cargos/new" icon={<Truck className="mr-2" />} />
    </div>
    <CargoList limit={6} title="Recent cargo transportation" className="mb-10 max-[768px]:mb-5" />
  </Container>
);

export default Home;
