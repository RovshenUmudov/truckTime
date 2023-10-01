'use client';

import { FC } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';
import { MinusCircle, Plus } from 'lucide-react';
import { EnumCargoType, IUnload } from '@/types';
import { IInputProps } from '@/components/ui/input';
import UnloadTimeField from '@/components/Forms/CargoForm/MultipleUnload/TimeField';
import UnloadNumberField from '@/components/Forms/CargoForm/MultipleUnload/NumberField';
import UnloadDateField from './DateField';

export interface IMultipleUnloadField extends IUnload, IInputProps {
  index: number;
  numberField?: boolean;
}

const MultipleUnload: FC<IUnload> = ({ formik }) => (
  <div className="grid grid-cols-1 gap-5">
    {formik.values.multipleUnload.map((unloading, index) => (
      <div
        key={`fieldKey${index + 1}`}
        className={clsx(
          'grid grid-cols-[1fr_auto] gap-2 items-center',
          formik.values.type === EnumCargoType.multiple ? 'bg-secondary p-5' : '',
        )}
      >
        <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
          <UnloadDateField index={index} value={unloading.date} formik={formik} />
          <UnloadTimeField index={index} value={unloading.time} formik={formik} />
          <UnloadNumberField
            index={index}
            value={unloading.distance}
            formik={formik}
            prefix="km"
            label="Distance"
            name="distance"
            numberField
            placeholder="Type distance in km"
            maxLength={5}
            min={1}
          />
          <UnloadNumberField
            index={index}
            value={unloading.breakTime}
            formik={formik}
            prefix="h"
            label="Break"
            name="breakTime"
            placeholder="Type break time in hours"
            maxLength={5}
          />
        </div>
        <Button
          disabled={formik.values.multipleUnload.length <= 1}
          className="mt-4 p-3"
          onClick={() => {
            formik.setFieldValue(
              'multipleUnload',
              formik.values.multipleUnload.filter((_, i) => i !== index),
            );
            formik.setFieldTouched(`multipleUnload.${index}`, false);
          }}
          type="button"
          variant="ghost"
        >
          <MinusCircle className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    ))}
    <Button
      type="button"
      disabled={formik.values.multipleUnload.length >= 3}
      onClick={() => {
        if (formik.values.multipleUnload.length < 3) {
          formik.setFieldValue(
            'multipleUnload',
            [...formik.values.multipleUnload, {}],
          );
        }
      }}
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

export default MultipleUnload;
