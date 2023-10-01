'use client';

import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Clock4 } from 'lucide-react';
import { IMultipleUnload } from '@/types';
import { IMultipleUnloadField } from '@/components/Forms/CargoForm/MultipleUnload';

const UnloadTimeField: FC<IMultipleUnloadField> = ({
  formik,
  index,
  value,
}) => (
  <Input
    type="time"
    name={`multipleUnload.${index}.time`}
    label="Unload Time *"
    placeholder="Set time"
    icon={<Clock4 className="w-4 h-4" />}
    disabled={formik.isSubmitting}
    value={value || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.multipleUnload && formik.touched.multipleUnload[index]?.time
      && formik.errors.multipleUnload && (formik.errors.multipleUnload[index] as IMultipleUnload)?.time ? (
        (formik.errors.multipleUnload[index] as IMultipleUnload).time
      ) : null}
  />
);

export default UnloadTimeField;
