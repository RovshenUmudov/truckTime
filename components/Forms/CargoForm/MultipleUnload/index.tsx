'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { MinusCircle, Plus } from 'lucide-react';
import { IUnload } from '@/types';
import { IInputProps, Input } from '@/components/ui/input';
import UnloadTimeField from '@/components/Forms/CargoForm/MultipleUnload/TimeField';
import UnloadNumberField from '@/components/Forms/CargoForm/MultipleUnload/NumberField';
import TimeField from 'react-simple-timefield';
import UnloadDateField from './DateField';

export interface IMultipleUnloadField extends IUnload, IInputProps {
  index: number;
}

const MultipleUnload: FC<IUnload> = ({ formik }) => (
  <div className="grid grid-cols-1 gap-5">
    {formik.values.multipleUnload.map((unloading, index) => (
      <div
        key={`fieldKey${index + 1}`}
        className="grid grid-cols-[1fr_auto] max-[768px]:grid-cols-1 gap-2 items-center bg-secondary p-5"
      >
        <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
          <UnloadDateField index={index} value={unloading.date} formik={formik} />
          <UnloadTimeField index={index} value={unloading.time} formik={formik} />
          <UnloadNumberField
            index={index}
            value={unloading.distance}
            formik={formik}
            prefix="km"
            label="Distance *"
            name="distance"
            placeholder="Type distance in km"
            maxLength={5}
            min={1}
          />
          <TimeField
            value={unloading.breakTime}
            onChange={formik.handleChange}
            colon=":"
            input={(
              <Input
                prefix="h:m"
                label="Break"
                name={`multipleUnload.${index}.breakTime`}
              />
            )}
          />
        </div>
        <Button
          disabled={formik.values.multipleUnload.length <= 1}
          className="mt-4 p-3 max-[768px]:mt-2 max-[768px]:w-[105px] max-[768px]:mx-auto"
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
          <div className="hidden max-[768px]:block ml-2 text-destructive">Remove</div>
        </Button>
      </div>
    ))}
    <Button
      type="button"
      disabled={formik.values.multipleUnload.length >= 6}
      onClick={() => {
        if (formik.values.multipleUnload.length < 6) {
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
