import { ReactNode } from 'react';
import Image from 'next/image';
import MainLogo from '@/components/ui/Logo';

const AuthLayout = ({ children }: { children: ReactNode; }) => (
  <div className="container relative hidden h-screen flex-col items-center
      justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
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
        <blockquote className="space-y-2">
          <p className="text-lg">
            "This web application was created special for track drives to save their time."
          </p>
          <footer className="text-sm">Rovshen Umudov</footer>
        </blockquote>
      </div>
    </div>
    {children}
  </div>
);

export default AuthLayout;
