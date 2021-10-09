import React, { useCallback, useState, useEffect } from 'react';
import { Checkbox } from '@shopify/polaris';

export default function FlgInput({ label, value, setValue }) {

    const handleChange = useCallback((newChecked) => {
        if (setValue) {
            setValue(newChecked, true);
        }
    }, []);

    return (
        <Checkbox
            label={label}
            checked={value}
            disabled={setValue ? false : true}
            onChange={handleChange}
        />
    );
}
