import { FC } from 'react';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Banner from '@/components/Banner';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authOptions';
import Content from '@/app/profile/Content';

export const metadata: Metadata = {
  title: 'Profile',
};

const Profile: FC = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <Header />
      <Container>
        <Banner src="/banner-all-cargo.jpg" />
        <Content user={session.user} />
      </Container>
    </>
  );
};

export default Profile;
