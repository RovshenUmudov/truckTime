import { FC } from 'react';
import Image from 'next/image';

interface IBanner {
    src: string;
}

const Banner: FC<IBanner> = ({ src }) => (
  <div className="h-[250px] max-[1300px]:pt-[21%] max-[1300px]:h-auto relative overflow-hidden rounded-md">
    <Image
      src={src}
      alt="banner"
      fill
      priority
      className="!h-auto"
      sizes="(min-width: 1920px) 100vw"
      quality={85}
    />
  </div>
);

export default Banner;
