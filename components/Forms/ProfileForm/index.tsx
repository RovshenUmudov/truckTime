'use client';

import { FC, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { validationProfile } from '@/utils/validations';
import { isObjEqual } from '@/utils';
import { IUserMe } from '@/types';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';

interface IProfileProps {
  initialValues: Partial<IUserMe>;
  handleSubmit: (values: Partial<IUserMe>, setSubmitting: (isSubmitting: boolean) => void) => void;
}

const ProfileForm: FC<IProfileProps> = ({
  initialValues,
  handleSubmit,
}) => {
  const { handleUnsavedChanges } = useContextUnsavedChanges();

  const formik = useFormik<Partial<IUserMe>>({
    initialValues: { averageSpeed: initialValues.averageSpeed || 77 },
    validationSchema: validationProfile,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  useEffect(() => {
    if (!isObjEqual(formik.values, { averageSpeed: initialValues.averageSpeed })) {
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
            formik.handleChange(e);
            if (e.target.value.length) {
              formik.setFieldValue('averageSpeed', parseFloat(e.target.value));
            }
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.averageSpeed && formik.errors.averageSpeed?.length ? (
            formik.errors.averageSpeed
          ) : null}
        />
      </div>
      <div>
        <Button
          disabled={formik.isSubmitting
              || Object.keys(formik.errors).length > 0
              || initialValues.averageSpeed === formik.values.averageSpeed}
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
