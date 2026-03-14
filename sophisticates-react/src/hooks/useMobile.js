import { useState, useEffect } from 'react';

/**
 * Returns true if the current viewport width is below `breakpoint` (default 768px).
 * On mobile, we disable scroll-triggered animations so content is always visible.
 */
export function useMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') return window.innerWidth <= breakpoint;
        return false;
    });

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= breakpoint);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);

    return isMobile;
}
