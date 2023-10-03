'use client';

import { FC } from 'react';
import DatePicker from '@/components/ui/Pickers/DataPicker';
import moment from 'moment';
import { IMultipleUnload } from '@/types';
import { IMultipleUnloadField } from '@/components/Forms/CargoForm/MultipleUnload';

const UnloadDateField: FC<IMultipleUnloadField> = ({
  formik,
  index,
  value,
}) => (
  <DatePicker
    name={`multipleUnload.${index}.date`}
    label={`Unload Date ${index > 0 ? index + 1 : ''} *`}
    placeholder="Pick unload date"
    disabled={formik.isSubmitting}
    value={value ? moment(value.toString()).toDate() : undefined}
    fromDate={moment(formik.values.multipleUnload[index - 1]?.date || formik.values.startDate).toDate()}
    onChange={(date: Date | undefined) => {
      formik.setFieldValue(
        'multipleUnload',
        formik.values.multipleUnload.map((el, idx) => (
          index === idx ? { ...el, date: moment(date).parseZone().format() } : el
        )),
      );
    }}
    error={formik.touched.multipleUnload
        && formik.touched.multipleUnload[index]?.date
        && formik.errors.multipleUnload && (formik.errors.multipleUnload[index] as IMultipleUnload)?.date ? (
        (formik.errors.multipleUnload[index] as IMultipleUnload).date
      ) : null}
  />
);

export default UnloadDateField;
