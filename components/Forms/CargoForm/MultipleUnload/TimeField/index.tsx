'use client';

import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Clock4 } from 'lucide-react';
import { IMultipleUnload } from '@/types';
import { IMultipleUnloadField } from '@/components/Forms/CargoForm/MultipleUnload';
import TimeField from 'react-simple-timefield';

const UnloadTimeField: FC<IMultipleUnloadField> = ({
  formik,
  index,
  value,
}) => (
  <TimeField
    colon=":"
    value={value?.toString() || ''}
    onChange={formik.handleChange}
    input={(
      <Input
        name={`multipleUnload.${index}.time`}
        label="Unload Time *"
        icon={<Clock4 className="w-4 h-4" />}
        disabled={formik.isSubmitting}
        onBlur={formik.handleBlur}
        error={formik.touched.multipleUnload && formik.touched.multipleUnload[index]?.time
        && formik.errors.multipleUnload && (formik.errors.multipleUnload[index] as IMultipleUnload)?.time ? (
            (formik.errors.multipleUnload[index] as IMultipleUnload).time
          ) : null}
      />
    )}
  />
);

export default UnloadTimeField;
