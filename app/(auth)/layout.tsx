import { ReactNode } from 'react';
import Image from 'next/image';
import MainLogo from '@/components/ui/Logo';

const AuthLayout = ({ children }: { children: ReactNode; }) => (
  <div className="container relative h-screen items-center
      justify-center grid max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div className="relative hidden h-full bg-muted p-10 text-white dark:border-r lg:flex flex-col items-start">
      <Image
        className="z-30 inset-0 absolute h-full object-cover"
        src="/auth/auth-bg.jpg"
        alt="auth wallpaper"
        priority
        sizes="(min-width: 1920px) 55vw, (max-width: 992px) 0vw"
        fill
        quality={85}
      />
      <MainLogo darkMode />
      <div className="relative z-30 mt-auto">
        <blockquote>
          <p className="text-lg">
            "This web application was created special for truck drives to save their time."
          </p>
          <footer className="text-sm">Rovshen Umudov</footer>
        </blockquote>
      </div>
    </div>
    {children}
  </div>
);

export default AuthLayout;
