import React, { useCallback, useState, useEffect } from 'react';
import { Select } from '@shopify/polaris';

const countryList = [
    { label: '日本', value: 'Japan' },
];


export default function CountryInput({ label, value, setValue }) {
    const [selected, setSelected] = useState(value);

    useEffect(() => {
        if (setValue) {
            setSelected(selected);
        }
    }, [selected]);

    const handleSelectChange = useCallback((value) => {
        setSelected(value);
    }, []);


    return (
        <Select
            label={label}
            options={countryList}
            onChange={handleSelectChange}
            value={selected}
        />
    );
}