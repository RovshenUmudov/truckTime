import { FC } from 'react';
import { ICargo } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CargoFeature from '@/components/CargoList/Item/Feature';
import moment from 'moment';
import { beatifyTime } from '@/utils';

const CargoItem: FC<{data: ICargo;}> = ({ data }) => (
  <Link href={`/cargo/${data._id}`}>
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>Cargo transportation details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <CargoFeature title="Dictance" feature={data.distance} prefix="km" />
          <CargoFeature title="Avg. speed" feature={data.averageSpeed} prefix="km/h" />
          <CargoFeature title="Start Date" feature={moment(data.startDate).format('ddd. MMM. DD.MM.YY HH:mm')} />
          <CargoFeature title="Unload Date" feature={moment(data.unloadDate).format('ddd. MMM. DD.MM.YY HH:mm')} />
          {data.driving?.hours !== undefined && data.driving?.minutes !== undefined ? (
            <CargoFeature title="Driving time" feature={beatifyTime(data.driving, false)} />
          ) : null}
          {data.remainingTime?.hours !== undefined && data.remainingTime?.minutes !== undefined ? (
            <CargoFeature title="Remaining time" feature={beatifyTime(data.remainingTime)} noBorder />
          ) : null}
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default CargoItem;
