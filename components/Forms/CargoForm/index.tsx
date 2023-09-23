'use client';

import React, { FC, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bed, Clock4, Coffee, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { validationCargo } from '@/utils/validations';
import DatePicker from '@/components/ui/Pickers/DataPicker';
import { calculateCargo, isObjEqual, numberRegExp } from '@/utils';
import { ICargoValues } from '@/types';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';
import Prompt from '@/components/Prompt';

interface ICargoForm {
  initialValues?: ICargoValues;
  handleSubmit: (values: ICargoValues, setSubmitting: (isSubmitting: boolean) => void) => void;
}

const defaultValues: ICargoValues = {
  title: '',
  startDate: new Date(),
  startTime: '',
  endDate: undefined,
  endTime: '',
  averageSpeed: 77,
  distance: null,
  longRest: '',
  shortRest: '',
  remainingWorkHours: '',
};

const CargoForm: FC<ICargoForm> = ({
  initialValues,
  handleSubmit,
}) => {
  const { handleUnsavedChanges } = useContextUnsavedChanges();

  const [error, setError] = useState<string>('');

  const formik = useFormik<ICargoValues>({
    initialValues: initialValues || defaultValues,
    validationSchema: validationCargo,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  useEffect(() => {
    if (!isObjEqual(formik.values, initialValues || defaultValues)) {
      handleUnsavedChanges(true);

      return;
    }

    handleUnsavedChanges(false);
  }, [formik.values]);

  useEffect(() => {
    const result = calculateCargo(formik.values);

    console.log('result', result);

    setError(result.error || '');
    formik.setFieldValue('shortRest', result.shortRest || '');
  }, [formik.values]);

  return (
    <>
      {error.length ? (
        <Prompt
          variant="destructive"
          description={error}
          icon={<AlertCircle className="h-4 w-4" />}
        />
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-5">
          <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
            <Input
              name="title"
              placeholder="Title"
              autoCapitalize="none"
              autoComplete="title"
              autoCorrect="off"
              label="Title *"
              disabled={formik.isSubmitting}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && formik.errors.title?.length ? formik.errors.title : null}
            />
            <Input
              name="remainingWorkHours"
              label="Remaining Hours *"
              placeholder="Type time"
              icon={<Clock4 className="w-4/6 h-4/6" />}
              value={formik.values.remainingWorkHours}
              type="time"
              disabled={formik.isSubmitting}
              helper="Type the remaining work hours for today"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.remainingWorkHours && formik.errors.remainingWorkHours?.length ? (
                formik.errors.remainingWorkHours
              ) : null}
            />
          </div>
          <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
            <DatePicker
              name="startDate"
              label="Start Date *"
              placeholder="Pick start date"
              disabled={formik.isSubmitting}
              value={formik.values.startDate}
              onBlur={formik.handleBlur}
              onChange={(date: Date | undefined) => formik.setFieldValue('startDate', date)}
              error={formik.touched.startDate && formik.errors.startDate?.length ? formik.errors.startDate : null}
            />
            <DatePicker
              name="endDate"
              label="Unload Date *"
              placeholder="Pick unload date"
              disabled={formik.isSubmitting}
              value={formik.values.endDate}
              onBlur={formik.handleBlur}
              onChange={(date: Date | undefined) => formik.setFieldValue('endDate', date)}
              error={formik.touched.endDate && formik.errors.endDate?.length ? formik.errors.endDate : null}
            />
          </div>
          <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
            <Input
              type="time"
              name="startTime"
              label="Start Time *"
              placeholder="Set time"
              icon={<Clock4 className="w-4/6 h-4/6" />}
              disabled={formik.isSubmitting}
              value={formik.values.startTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startTime && formik.errors.startTime?.length ? formik.errors.startTime : null}
            />
            <Input
              type="time"
              name="endTime"
              label="Unload Time *"
              placeholder="Set time"
              icon={<Clock4 className="w-4/6 h-4/6" />}
              disabled={formik.isSubmitting}
              value={formik.values.endTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endTime && formik.errors.endTime?.length ? formik.errors.endTime : null}
            />
          </div>
          <div className="grid gap-5 grid-cols-[1fr_170px] max-[768px]:grid-cols-1">
            <Input
              prefix="km"
              name="distance"
              label="Distance"
              placeholder="Type distance in km"
              disabled={formik.isSubmitting}
              value={formik.values.distance || ''}
              maxLength={5}
              min={1}
              onChange={(e) => {
                if (e.target.value === '' || (numberRegExp.test(e.target.value) && +e.target.value > 0)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.distance && formik.errors.distance?.length ? formik.errors.distance : null}
            />
            <Input
              prefix="km/h"
              name="averageSpeed"
              placeholder="Average Speed"
              label="Average Speed *"
              disabled
              value={formik.values.averageSpeed}
            />
          </div>
          <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
            <Input
              name="longRest"
              label="Long Rest"
              icon={<Bed className="w-4/6 h-4/6" />}
              placeholder="0"
              helper="Each long rest is equal to 9 hours"
              value={formik.values.longRest}
              onChange={formik.handleChange}
              disabled
            />
            <Input
              name="shortRest"
              icon={<Coffee className="w-4/6 h-4/6" />}
              label="Short Rest"
              helper="Each short rest is equal to 1 hour"
              placeholder="0"
              value={formik.values.shortRest}
              onChange={formik.handleChange}
              disabled
            />
          </div>
          <Button
            disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || !formik.values.title}
            className="max-w-[200px] mr-0 ml-auto"
            type="submit"
          >
            {formik.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create
          </Button>
        </div>
      </form>
    </>
  );
};

export default CargoForm;
