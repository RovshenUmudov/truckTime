import { FC } from 'react';
import Image from 'next/image';

interface IBanner {
    src: string;
}

const Banner: FC<IBanner> = ({ src }) => (
  <div className="h-[250px] max-[1300px]:pt-[30%] max-[1300px]:h-auto relative overflow-hidden rounded-md">
    <Image
      src={src}
      alt="banner"
      fill
      priority
      className="!h-auto max-[1300px]:!h-full"
      sizes="(min-width: 1920px) 100vw"
      quality={90}
    />
  </div>
);

export default Banner;
