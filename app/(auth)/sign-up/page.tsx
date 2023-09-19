import { FC } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils';
import Content from '@/app/(auth)/sign-up/Content';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUp: FC = () => (
  <div>
    <Link
      href="/login"
      className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
    >
      Login
    </Link>
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <Content />
    </div>
  </div>
);

export default SignUp;
