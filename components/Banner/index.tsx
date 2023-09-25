import { FC } from 'react';
import Image from 'next/image';

interface IBanner {
    src: string;
}

const Banner: FC<IBanner> = ({ src }) => (
  <div className="h-[250px] max-[992px]:h-[200px] max-[768px]:h-[150px] relative overflow-hidden rounded-md">
    <Image
      src={src}
      alt="banner"
      fill
      priority
      className="!h-auto max-[1300px]:!h-full max-[1250px]:!max-w-none max-[1250px]:!w-auto"
      sizes="(max-width: 992px) 100vw, (min-width: 1440px) 1360px"
      quality={90}
    />
  </div>
);

export default Banner;
