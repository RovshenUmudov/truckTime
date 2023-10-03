'use client';

import { FC, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { validationProfile } from '@/utils/validations';
import { isObjEqual, numberRegExp } from '@/utils';
import { IUser } from '@/types';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';

interface IProfileProps {
  initialValues: Partial<IUser>;
  handleSubmit: (values: Partial<IUser>, setSubmitting: (isSubmitting: boolean) => void) => void;
}

const ProfileForm: FC<IProfileProps> = ({
  initialValues,
  handleSubmit,
}) => {
  const { handleUnsavedChanges, unsavedChanges } = useContextUnsavedChanges();

  const formik = useFormik<Partial<IUser>>({
    initialValues: {
      averageSpeed: initialValues.averageSpeed || 77,
      restTime: initialValues.restTime || 11,
    },
    validationSchema: validationProfile,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  useEffect(() => {
    if (!isObjEqual(formik.values, {
      averageSpeed: initialValues.averageSpeed,
      restTime: initialValues.restTime,
    })) {
      handleUnsavedChanges(true);

      return;
    }

    handleUnsavedChanges(false);
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid gap-5 grid-cols-2 max-[768px]:grid-cols-1">
        <Input
          name="email"
          placeholder="Email"
          label="Email"
          disabled
          value={initialValues.email}
        />
        <Input
          prefix="km/h"
          name="averageSpeed"
          placeholder="Average Speed"
          label="Average Speed *"
          disabled={formik.isSubmitting}
          value={formik.values.averageSpeed}
          onChange={(e) => {
            if (numberRegExp.test(e.target.value)) {
              formik.setFieldValue('averageSpeed', parseFloat(e.target.value));
            }
            if (e.target.value === '') formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.averageSpeed && formik.errors.averageSpeed?.length ? (
            formik.errors.averageSpeed
          ) : null}
        />
        <Input
          prefix="hrs"
          name="restTime"
          placeholder="Rest Time"
          label="Rest Time *"
          helper="Usually rest time is equal to 11 hours"
          disabled={formik.isSubmitting}
          value={formik.values.restTime}
          onChange={(e) => {
            if (numberRegExp.test(e.target.value)) {
              formik.setFieldValue('restTime', parseFloat(e.target.value));
            }
            if (e.target.value === '') formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.restTime && formik.errors.restTime?.length ? (
            formik.errors.restTime
          ) : null}
        />
      </div>
      <div>
        <Button
          disabled={formik.isSubmitting
              || Object.keys(formik.errors).length > 0
              || !unsavedChanges}
          className="max-w-[200px] mt-5"
          type="submit"
        >
          {formik.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
