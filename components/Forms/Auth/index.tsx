'use client';

import React, { FC, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { validationSignUp } from '@/utils/validations';
import { ICredentials } from '@/types';
import { signIn } from 'next-auth/react';

interface IAuthForm {
  handleSubmit: (values: ICredentials, setSubmitting: (isSubmitting: boolean) => void) => void;
}

const AuthForm: FC<IAuthForm> = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSignUp,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  useEffect(() => {
    formik.setFieldValue('email', formik.values.email.trim());
  }, [formik.values.email]);

  return (
    <div className="grid gap-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              name="email"
              id="email"
              placeholder="email@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={formik.isSubmitting}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email?.length ? formik.errors.email : null}
            />
            <Input
              name="password"
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={formik.isSubmitting}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password?.length ? formik.errors.password : null}
            />
          </div>
          <Button disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Continue
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={formik.isSubmitting}
        onClick={() => signIn('google', { redirect: false, callbackUrl: '/' })}
      >
        Google
      </Button>
    </div>
  );
};

export default AuthForm;
