import { FC } from 'react';
import { EnumCargoType, EnumUserRole, ICargo, IUser } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CargoFeature from '@/components/CargoList/Item/Feature';
import moment from 'moment';
import { beatifyTime, splitTimeStr } from '@/utils';
import { fetchAPI } from '@/utils/fetch';

interface ICargoItem {
  data: ICargo;
  token: string;
  role: EnumUserRole;
}

export async function getUserById(id: string, token: string) {
  if (!id) return null;

  const res = await fetchAPI<IUser, undefined>(
    `/users/${id}`,
    undefined,
    {
      method: 'GET',
      accessToken: token,
    },
  );

  return res;
}

const CargoItem: FC<ICargoItem> = async ({ data, token, role }) => {
  let user = null;
  let lastUnload = null;

  if (role === EnumUserRole.admin) {
    user = await getUserById(data.userId || '', token);
  }

  if (data.type === EnumCargoType.multiple) {
    const [lastElem] = data.multipleUnload.slice(-1);

    lastUnload = lastElem;
  }

  return (
    <Link href={`/cargos/${data._id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>Cargo transportation details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <CargoFeature title="Type" feature={data.type || ''} />
            <CargoFeature title="Dictance" feature={data.totalDistance || '~'} prefix="km" />
            <CargoFeature title="Avg. speed" feature={data.averageSpeed} prefix="km/h" />
            <CargoFeature
              title="Start Date"
              feature={moment(data.startDate).parseZone().format('ddd. MMM. DD.MM.YY HH:mm')}
            />
            {!data.type || data.type === EnumCargoType.single ? (
              <CargoFeature
                title="Unload Date"
                feature={moment(data.unloadDate).parseZone().format('ddd. MMM. DD.MM.YY HH:mm')}
              />
            ) : (
              <CargoFeature
                title="Unload Date"
                feature={moment(lastUnload?.date || '')
                  .set(splitTimeStr(lastUnload?.time || ''))
                  .parseZone()
                  .format('ddd. MMM. DD.MM.YY HH:mm')}
              />
            )}
            {data.driving?.hours !== undefined && data.driving?.minutes !== undefined ? (
              <CargoFeature title="Driving time" feature={beatifyTime(data.driving, false)} />
            ) : null}
            <CargoFeature
              title="Total Rest Time"
              feature={beatifyTime({
                hours: data.totalRestTime,
                minutes: 0,
              }, false, false)}
            />
            {data.remainingTime?.hours !== undefined && data.remainingTime?.minutes !== undefined ? (
              <CargoFeature title="Remaining time" feature={beatifyTime(data.remainingTime)} noBorder />
            ) : null}
            {role === EnumUserRole.admin ? (
              <CargoFeature title="User" feature={user?.data?.email || ''} />
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CargoItem;
