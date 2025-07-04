// components/AdminGuard.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDecodedData } from '@/utils/jwtDecoder';

const UserGuard = ({ children }) => {
    const router = useRouter();
    const user = getDecodedData();

    // console.log(user);

    useEffect(() => {
        if (!user || (user?.role !== 'user' && user?.role !== 'admin')) {
            router.replace('/unauthorized'); // or '/login'
        }
    }, []);

    // Don't render anything until useEffect runs
    if (!user || (user?.role !== 'user' && user?.role !== 'admin')) return null;

    return <>{children}</>;
};

export default UserGuard;
