import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';
import Container from '@/components/Container';

const Loading: FC = () => (
  <>
    <Skeleton className="h-24 max-[992px]:h-14 w-full" />
    <Container disableHeader disableFooter>
      <Skeleton className="h-[250px] w-full max-[1250px]:h-auto max-[1250px]:pt-[21%]" />
      <Skeleton className="h-8 w-[250px] my-5" />
      <Skeleton className="h-[46px] w-full max-w-[700px] my-5" />
      <div className="max-w-[768px] mt-5">
        <div className="grid gap-5">
          <Skeleton className="h-10 w-full" />
          <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-5 grid-cols-[1fr_170px] max-[768px]:grid-cols-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex justify-end gap-5">
            <Skeleton className="h-10 w-[70px]" />
            <Skeleton className="h-10 w-[70px]" />
          </div>
        </div>
      </div>
    </Container>
  </>
);

export default Loading;
