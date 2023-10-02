import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useQueryString = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateQuery = (name: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== 'all') {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    params.toString();
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    updateQuery,
  };
};

export default useQueryString;
