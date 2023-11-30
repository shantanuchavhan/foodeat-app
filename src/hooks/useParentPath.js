"use client"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useParentPath = () => {
  const [parentPath, setParentPath] = useState('');

  const pathname = usePathname();

  useEffect(() => {
    const parentPathValue = pathname.replace(/\/[^/]*$/, '');
    setParentPath(parentPathValue);
  }, [pathname]);

  return parentPath;
};

export default useParentPath;
