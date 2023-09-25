'use client';

import { FC, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bed, Clock4, Coffee, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { validationCargo } from '@/utils/validations';
import DatePicker from '@/components/ui/Pickers/DataPicker';
import { beatifyTime, calculateCargo, eightHoursBreakCountRegExp, isObjEqual, numberRegExp } from '@/utils';
import { ICalculateCargo, ICargo } from '@/types';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';
import Prompt from '@/components/Prompt';
import moment from 'moment';

interface ICargoProps {
  initialValues?: ICargo;
  handleSubmit: (values: ICargo, setSubmitting: (isSubmitting: boolean) => void) => void;
  handleDelete?: () => void;
}

const defaultValues: ICargo = {
  title: '',
  startDate: moment().set({ hour: 0, minutes: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DDTHH:mm:ssZ'),
  startTime: '',
  unloadDate: undefined,
  unloadTime: '',
  averageSpeed: 77,
  distance: null,
  eightHoursBreak: 0,
  oneHoursBreak: 0,
  remainingWorkHours: '',
};

const CargoForm: FC<ICargoProps> = ({
  initialValues,
  handleSubmit,
  handleDelete,
}) => {
  const { handleUnsavedChanges } = useContextUnsavedChanges();

  const [state, setState] = useState<ICalculateCargo | null>(null);

  const formik = useFormik<ICargo>({
    initialValues: initialValues || defaultValues,
    validationSchema: validationCargo,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  useEffect(() => {
    const result = calculateCargo(formik.values);

    setState(result || null);
    formik.setFieldValue('oneHoursBreak', result.oneHoursBreak);

    if (!isObjEqual(formik.values, initialValues || defaultValues)) {
      handleUnsavedChanges(true);

      return;
    }

    handleUnsavedChanges(false);
  }, [formik.values]);

  return (
    <>
      {state?.remainingTime
        && state?.driving
        && state.driving.durationInSeconds > 0
        && !(state.remainingTime.hours === 0 && state.remainingTime.minutes === 0)
        ? (
          <Prompt
            variant={state.remainingTime.hours < 0 || state.remainingTime.minutes < 0 ? 'destructive' : 'default'}
            description={`${state.remainingTime.hours < 0 || state.remainingTime.minutes < 0 ? (
              'You not enough time: ') : 'You have enough time: '}
              ${beatifyTime(state.remainingTime)}`}
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
              value={moment(formik.values.startDate).toDate()}
              onBlur={formik.handleBlur}
              onChange={(date: Date | undefined) => formik.setFieldValue('startDate', moment(date).format())}
              error={formik.touched.startDate && formik.errors.startDate?.length ? formik.errors.startDate : null}
            />
            <DatePicker
              name="unloadDate"
              label="Unload Date *"
              placeholder="Pick unload date"
              disabled={formik.isSubmitting}
              value={formik.values.unloadDate ? moment(formik.values.unloadDate).toDate() : undefined}
              onBlur={formik.handleBlur}
              fromDate={moment(formik.values.startDate).toDate()}
              onChange={(date: Date | undefined) => formik.setFieldValue('unloadDate', moment(date).format())}
              error={formik.touched.unloadDate && formik.errors.unloadDate?.length ? formik.errors.unloadDate : null}
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
              name="unloadTime"
              label="Unload Time *"
              placeholder="Set time"
              icon={<Clock4 className="w-4/6 h-4/6" />}
              disabled={formik.isSubmitting}
              value={formik.values.unloadTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.unloadTime && formik.errors.unloadTime?.length ? formik.errors.unloadTime : null}
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
              value={formik.values.averageSpeed}
              disabled
            />
          </div>
          <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
            <Input
              name="eightHoursBreak"
              label="Eight Hours Break"
              placeholder="0"
              icon={<Bed className="w-4/6 h-4/6" />}
              helper="Each break is equal to 9 hours"
              value={formik.values.eightHoursBreak}
              onChange={(e) => {
                if (eightHoursBreakCountRegExp.test(e.target.value) || e.target.value === '') formik.handleChange(e);
              }}
            />
            <Input
              name="oneHoursBreak"
              icon={<Coffee className="w-4/6 h-4/6" />}
              label="One Hours Break"
              placeholder="0"
              helper="Each break is equal to 1 hour"
              value={formik.values.oneHoursBreak || 0}
              onChange={formik.handleChange}
              disabled
            />
          </div>
          <div className="flex justify-end gap-5">
            {initialValues ? (
              <Button variant="destructive" className="max-w-[200px]" type="button" onClick={handleDelete}>
                {formik.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Delete
              </Button>
            ) : null}
            <Button
              disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || !formik.values.title}
              className="max-w-[200px]"
              type="submit"
            >
              {formik.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {initialValues ? 'Save' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CargoForm;
