'use client';

import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { numberRegExp } from '@/utils';
import { IMultipleUnload } from '@/types';
import { IMultipleUnloadField } from '@/components/Forms/CargoForm/MultipleUnload';

const UnloadNumberField: FC<IMultipleUnloadField> = ({
  formik,
  index,
  value,
  name = '',
  prefix,
  ...rest
}) => (
  <Input
    prefix={prefix}
    name={`multipleUnload.${index}.${name}`}
    disabled={formik.isSubmitting}
    value={value || ''}
    onBlur={formik.handleBlur}
    onChange={(e) => {
      if (numberRegExp.test(e.target.value)) {
        formik.setFieldValue(`multipleUnload.${index}.${name}`, parseFloat(e.target.value));
      }
      if (e.target.value === '') formik.handleChange(e);
    }}
    error={formik.touched.multipleUnload
      && formik.touched.multipleUnload[index]?.[name as keyof IMultipleUnload]
      && formik.errors.multipleUnload
      && (formik.errors.multipleUnload[index] as IMultipleUnload)?.[name as keyof IMultipleUnload] ? (
        (formik.errors.multipleUnload[index] as IMultipleUnload)[name as keyof IMultipleUnload]
      ) : null}
    {...rest}
  />
);

export default UnloadNumberField;
