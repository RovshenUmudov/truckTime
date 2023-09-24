import { FC } from 'react';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Content from '@/app/cargo/new/Content';

const NewCargo: FC = () => (
  <>
    <Header />
    <Container>
      <Banner src="/new-cargo-banner.jpg" />
      <div className="max-w-[700px] mt-5">
        <h2 className="text-3xl font-bold mb-5">Create new cargo</h2>
        <Content />
      </div>
    </Container>
  </>
);

export default NewCargo;
