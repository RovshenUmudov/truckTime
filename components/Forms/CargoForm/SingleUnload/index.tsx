'use client';

import { FC } from 'react';
import { IUnload } from '@/types';
import DatePicker from '@/components/ui/Pickers/DataPicker';
import { Input } from '@/components/ui/input';
import moment from 'moment';
import { Clock4 } from 'lucide-react';
import TimeField from 'react-simple-timefield';

const SingleUnload: FC<IUnload> = ({ formik }) => (
  <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
    <DatePicker
      name="unloadDate"
      label="Unload Date *"
      placeholder="Pick unload date"
      disabled={formik.isSubmitting}
      value={formik.values.unloadDate ? moment(formik.values.unloadDate).toDate() : undefined}
      onBlur={formik.handleBlur}
      fromDate={moment(formik.values.startDate).toDate()}
      onChange={(date: Date | undefined) => formik.setFieldValue('unloadDate', moment(date).parseZone().format())}
      error={formik.touched.unloadDate && formik.errors.unloadDate?.length ? formik.errors.unloadDate : null}
    />
    <TimeField
      colon=":"
      value={formik.values.unloadTime}
      onChange={formik.handleChange}
      input={(
        <Input
          name="unloadTime"
          label="Unload Time *"
          placeholder="Set time"
          icon={<Clock4 className="w-4 h-4" />}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          error={formik.touched.unloadTime && formik.errors.unloadTime?.length ? formik.errors.unloadTime : null}
        />
      )}
    />
  </div>
);

export default SingleUnload;
