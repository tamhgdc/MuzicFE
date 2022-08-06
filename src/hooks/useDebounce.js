import { useEffect } from 'react';
import { useState } from 'react';

function useDebounce(value, delay) {
    let [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        let handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
