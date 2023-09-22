import { FC } from 'react';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Container from '@/components/Container';
import LinkButton from '@/components/ui/LinkButton';

const Home: FC = () => (
  <>
    <Header />
    <Container>
      <Banner src="/banner.jpg" />
      <LinkButton label="New Cargo Transportation" href="/new-cargo" />
    </Container>
  </>
);

export default Home;
