'use client';

import React, { FC, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bed, Clock2, Clock3, Clock4, Coffee, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { validationCargo } from '@/utils/validations';
import DatePicker from '@/components/ui/pickers/DataPicker';
import { calculateCargo, floatNumberRegExp, isObjEqual, isValidTime, numberRegExp } from '@/utils';
import { ICargoValues } from '@/types';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';
import dayjs from 'dayjs';
import Prompt from '@/components/Prompt';

interface ICargoForm {
  formRef: React.RefObject<HTMLFormElement>;
  initialValues?: ICargoValues;
  handleLock: (isLocked: boolean) => void;
  handleSubmit: (values: ICargoValues, setSubmitting: (isSubmitting: boolean) => void) => void;
}

const defaultValues: ICargoValues = {
  title: '',
  startDate: new Date(),
  startTime: '',
  endDate: undefined,
  endTime: '',
  averageSpeed: 77,
  distance: '',
  longRest: '',
  shortRest: '',
  remainingWorkHours: '',
};

const CargoForm: FC<ICargoForm> = ({
  handleLock,
  initialValues,
  handleSubmit,
  formRef,
}) => {
  const { handleUnsavedChanges } = useContextUnsavedChanges();

  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const formik = useFormik<ICargoValues>({
    initialValues: initialValues || defaultValues,
    validationSchema: validationCargo,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  useEffect(() => {
    handleLock(Object.keys(formik.errors).length > 0);
  }, [formik.errors, formik.values]);

  useEffect(() => {
    if (!isObjEqual(formik.values, initialValues || defaultValues)) {
      handleUnsavedChanges(true);

      return;
    }

    handleUnsavedChanges(false);
  }, [formik.values]);

  useEffect(() => {
    setIsDisable(false);
  }, []);

  useEffect(() => {
    const result = calculateCargo(formik.values);

    if (result?.drivingHours === undefined || result?.remainingTime === undefined) return;

    setIsInvalid(result.remainingTime < 0);

    console.log(result);

    formik.setFieldValue('shortRest', result.shortRest || '');
    formik.setFieldValue('longRest', result.shortRest || '');
  }, [formik.values]);

  return (
    <>
      {isInvalid ? (
        <Prompt
          variant="destructive"
          description="Your calculation is invalid."
          icon={<AlertCircle className="h-4 w-4" />}
        />
      ) : null}
      <form onSubmit={formik.handleSubmit} ref={formRef}>
        <div className="grid gap-5">
          <div className="grid gap-5 grid-cols-2">
            <Input
              name="title"
              placeholder="Title"
              autoCapitalize="none"
              autoComplete="title"
              autoCorrect="off"
              label="Title *"
              disabled={isDisable}
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
              disabled={isDisable}
              helper="Type the remaining work hours for today"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.remainingWorkHours && formik.errors.remainingWorkHours?.length ? (
                formik.errors.remainingWorkHours
              ) : null}
            />
          </div>
          <div className="grid gap-5 grid-cols-2">
            <DatePicker
              name="startDate"
              label="Start Date *"
              placeholder="Pick start date"
              disabled={isDisable}
              value={formik.values.startDate}
              onBlur={formik.handleBlur}
              onChange={(date: Date | undefined) => formik.setFieldValue('startDate', date)}
              error={formik.touched.startDate && formik.errors.startDate?.length ? formik.errors.startDate : null}
            />
            <DatePicker
              name="endDate"
              label="Unload Date *"
              placeholder="Pick unload date"
              disabled={isDisable}
              value={formik.values.endDate}
              onBlur={formik.handleBlur}
              onChange={(date: Date | undefined) => formik.setFieldValue('endDate', date)}
              error={formik.touched.endDate && formik.errors.endDate?.length ? formik.errors.endDate : null}
            />
          </div>
          <div className="grid gap-5 grid-cols-2">
            <Input
              type="time"
              name="startTime"
              label="Start Time *"
              icon={<Clock2 className="w-4/6 h-4/6" />}
              disabled={isDisable}
              value={formik.values.startTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startTime && formik.errors.startTime?.length ? formik.errors.startTime : null}
            />
            <Input
              type="time"
              name="endTime"
              label="Unload Time *"
              icon={<Clock3 className="w-4/6 h-4/6" />}
              disabled={isDisable}
              value={formik.values.endTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endTime && formik.errors.endTime?.length ? formik.errors.endTime : null}
            />
          </div>
          <div className="grid gap-5 grid-cols-[1fr_170px]">
            <Input
              prefix="km"
              name="distance"
              label="Distance"
              placeholder="Type distance in km"
              disabled={isDisable}
              value={formik.values.distance}
              maxLength={5}
              onChange={(e) => {
                if (e.target.value === '' || numberRegExp.test(e.target.value)) {
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
              onChange={(e) => {
                if (e.target.value === '' || numberRegExp.test(e.target.value)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.averageSpeed && formik.errors.averageSpeed?.length ? (
                formik.errors.averageSpeed
              ) : null}
            />
          </div>
          <div className="grid gap-5 grid-cols-2">
            <Input
              name="longRest"
              label="Long Rest *"
              icon={<Bed className="w-4/6 h-4/6" />}
              placeholder="Type number"
              helper="Each long rest is equal to 9 hours"
              value={formik.values.longRest}
              disabled
              onChange={(e) => {
                if (e.target.value === '' || numberRegExp.test(e.target.value)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.longRest && formik.errors.longRest?.length ? formik.errors.longRest : null}
            />
            <Input
              name="shortRest"
              icon={<Coffee className="w-4/6 h-4/6" />}
              label="Short Rest *"
              helper="Each short rest is equal to 1 hour"
              placeholder="Type number"
              value={formik.values.shortRest}
              disabled
              maxLength={1}
              onChange={(e) => {
                if (e.target.value === '' || numberRegExp.test(e.target.value)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.shortRest && formik.errors.shortRest?.length ? formik.errors.longRest : null}
            />
          </div>
          <Button
            disabled={formik.isSubmitting}
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
