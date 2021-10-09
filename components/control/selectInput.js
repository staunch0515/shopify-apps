import React, { useCallback, useState, useEffect } from 'react';
import { Select } from '@shopify/polaris';

export default function SelectInput({ label, value, setValue, options, disabled }) {
    const [selected, setSelected] = useState(value);

    useEffect(() => {
        if (setValue) {
            setValue(selected, true);
        }
    }, [selected]);

    const handleSelectChange = useCallback((value) => {
        setSelected(value);
    }, []);

    return (
        <Select
            label={label}
            options={options}
            disabled={disabled ? true : false}
            onChange={handleSelectChange}
            value={selected}
        />
    );
}