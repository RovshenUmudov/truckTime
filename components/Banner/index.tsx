import { FC } from 'react';
import Image from 'next/image';

interface IBanner {
    src: string;
}

const Banner: FC<IBanner> = ({ src }) => (
  <div className="h-[250px] relative overflow-hidden rounded-md">
    <Image
      src={src}
      alt="banner"
      fill
      priority
      className="!h-auto"
      sizes="(min-width: 1920px) 100vw"
      quality={80}
    />
  </div>
);

export default Banner;
