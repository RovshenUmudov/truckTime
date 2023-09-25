import { FC } from 'react';
import Image from 'next/image';

interface IBanner {
    src: string;
}

const Banner: FC<IBanner> = ({ src }) => (
  <div className="h-[250px] max-[1250px]:h-auto relative overflow-hidden rounded-md mb-5 max-[768px]:mb-4">
    <Image
      src={src}
      alt="banner"
      fill
      priority
      className="!h-auto max-[1250px]:!h-full !relative"
      sizes="(max-width: 992px) 100vw, (min-width: 1440px) 1360px"
      quality={90}
    />
  </div>
);

export default Banner;
