'use client';

import { FC, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Clock4, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { validationCargo } from '@/utils/validations';
import DatePicker from '@/components/ui/Pickers/DataPicker';
import { calculateCargo, isObjEqual, numberRegExp } from '@/utils';
import { EnumCargoType, EnumEightHourRest, ICargo, IOption } from '@/types';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';
import moment from 'moment';
import InputSelect from '@/components/ui/InputSelect';
import { Button } from '@/components/ui/button';
import MultipleUnload from '@/components/Forms/CargoForm/MultipleUnload';
import SingleUnload from '@/components/Forms/CargoForm/SingleUnload';
import CargoFormPrompt from '@/components/Forms/CargoForm/FormPrompt';
import TimeField from 'react-simple-timefield';
import { useSession } from 'next-auth/react';

interface ICargoProps {
  initialValues?: ICargo;
  handleSubmit: (values: ICargo, setSubmitting: (isSubmitting: boolean) => void) => void;
  handleDelete?: () => void;
  averageSpeed?: number;
}

const optionsList: IOption[] = [
  { label: 'Single unload', value: EnumCargoType.single },
  { label: 'Multiple unload', value: EnumCargoType.multiple },
];

const optionsListEightHourRest: IOption[] = [
  { label: 'None', value: EnumEightHourRest.None },
  { label: 'One', value: EnumEightHourRest.One },
  { label: 'Two', value: EnumEightHourRest.Two },
  { label: 'Three', value: EnumEightHourRest.Three },
];

const optionsListWeekend: IOption[] = [
  { label: 'None', value: '0' },
  { label: '24 hours', value: '24' },
  { label: '45 hours', value: '45' },
];

export const defaultCargoFormValues: ICargo = {
  title: '',
  startDate: moment().set({ hour: 0, minutes: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DDTHH:mm:ssZ'),
  startTime: '',
  multipleUnload: [{
    date: '',
    time: '00:00',
    distance: '',
    breakTime: '',
  }],
  unloadDate: undefined,
  unloadTime: '00:00',
  weekendHours: 0,
  averageSpeed: 77,
  totalDistance: undefined,
  totalRestTime: 0,
  type: EnumCargoType.single,
  eightHoursRest: EnumEightHourRest.None,
  userRestTime: 11,
  oneHoursBreak: 0,
  remainingWorkHours: '08:00',
  remainingTime: null,
  driving: null,
  duration: null,
};

const CargoForm: FC<ICargoProps> = ({
  initialValues,
  handleSubmit,
  handleDelete,
  averageSpeed,
}) => {
  const { data: session } = useSession();
  const { handleUnsavedChanges } = useContextUnsavedChanges();
  const [state, setState] = useState<Partial<ICargo> | null>(null);

  const formik = useFormik<ICargo>({
    initialValues: initialValues || defaultCargoFormValues,
    validationSchema: validationCargo,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit({ ...values, ...state }, setSubmitting);
    },
  });

  useEffect(() => {
    if (!session?.user) return;

    const result = calculateCargo(formik.values, initialValues?.userRestTime || session.user.restTime || 0);

    setState(result || null);

    if (formik.values.type === EnumCargoType.multiple) {
      formik.setFieldValue('totalDistance', result.totalDistance || '');
    }

    if (!isObjEqual(formik.values, initialValues || defaultCargoFormValues)) {
      handleUnsavedChanges(true);

      return;
    }

    handleUnsavedChanges(false);
  }, [formik.values, session?.user]);

  useEffect(() => {
    formik.setFieldTouched('totalDistance', false);
    formik.setFieldValue('totalDistance', initialValues?.totalDistance || defaultCargoFormValues.totalDistance);
  }, [formik.values.type]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <CargoFormPrompt data={state || initialValues || null} />
      <div className="grid gap-5">
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
        <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
          <InputSelect
            label="Type *"
            name="type"
            options={optionsList}
            defaultValue={formik.values.type}
            disabled={formik.isSubmitting}
            handleChange={(e) => {
              formik.setFieldValue('type', e);
            }}
          />
          <TimeField
            colon=":"
            value={formik.values.remainingWorkHours}
            onChange={formik.handleChange}
            input={(
              <Input
                label="Remaining Hours *"
                name="remainingWorkHours"
                icon={<Clock4 className="w-4 h-4" />}
                disabled={formik.isSubmitting}
                helper="Type the remaining work hours for today"
                onBlur={formik.handleBlur}
                error={formik.touched.remainingWorkHours && formik.errors.remainingWorkHours?.length ? (
                  formik.errors.remainingWorkHours
                ) : null}
              />
            )}
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
            onChange={(date: Date | undefined) => formik.setFieldValue('startDate', moment(date).parseZone().format())}
            error={formik.touched.startDate && formik.errors.startDate?.length ? formik.errors.startDate : null}
          />
          <TimeField
            colon=":"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            input={(
              <Input
                label="Start Time *"
                name="startTime"
                icon={<Clock4 className="w-4 h-4" />}
                disabled={formik.isSubmitting}
                onBlur={formik.handleBlur}
                error={formik.touched.startTime && formik.errors.startTime?.length ? formik.errors.startTime : null}
              />
            )}
          />
        </div>
        {formik.values.type === EnumCargoType.multiple ? (
          <MultipleUnload formik={formik} />
        ) : <SingleUnload formik={formik} />}
        <div className="grid gap-5 grid-cols-[1fr_170px] max-[768px]:grid-cols-1">
          <Input
            prefix="km"
            name="totalDistance"
            label="Todal Distance *"
            placeholder="Type distance in km"
            disabled={formik.isSubmitting || formik.values.type === EnumCargoType.multiple}
            value={formik.values.totalDistance === undefined ? '' : formik.values.totalDistance}
            maxLength={5}
            onChange={(e) => {
              if (numberRegExp.test(e.target.value)) {
                formik.setFieldValue('totalDistance', parseFloat(e.target.value));
              }

              if (e.target.value === '') formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.totalDistance && formik.errors.totalDistance?.length ? (
              formik.errors.totalDistance) : null}
          />
          <Input
            prefix="km/h"
            name="averageSpeed"
            label="Average Speed *"
            value={averageSpeed || formik.values.averageSpeed}
            disabled
          />
        </div>
        <div className="grid gap-5 grid-cols-3 max-[768px]:grid-cols-1">
          <InputSelect
            label="Eight Hours Rest"
            name="eightHoursRest"
            options={optionsListEightHourRest}
            defaultValue={formik.values.eightHoursRest || 0}
            disabled={formik.isSubmitting}
            handleChange={(e) => formik.setFieldValue('eightHoursRest', e)}
          />
          <InputSelect
            label="Weekend Hours"
            name="weekendHours"
            options={optionsListWeekend}
            defaultValue={formik.values.weekendHours || 0}
            disabled={formik.isSubmitting}
            handleChange={(e) => formik.setFieldValue('weekendHours', e)}
          />
          <Input
            name="oneHoursBreak"
            prefix="hrs"
            label="One Hours Break"
            placeholder="0"
            value={state?.oneHoursBreak || 0}
            disabled
          />
          <Input
            name="totalRestTime"
            prefix="hrs"
            label="Total Rest Time"
            disabled
            value={state ? state.totalRestTime : (initialValues?.totalRestTime || 0)}
          />
        </div>
        <div className="flex justify-end gap-5">
          {initialValues ? (
            <Button variant="destructive" className="max-w-[200px]" type="button" onClick={handleDelete}>
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
  );
};

export default CargoForm;
