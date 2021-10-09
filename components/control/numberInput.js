import React, { useCallback, useState, useEffect } from 'react';
import { FormLayout, TextStyle, TextField, Button, Checkbox } from '@shopify/polaris';

export default function NumberInput({ label, value, setValue, autoFocus }) {

    const [number, setNumber] = useState(value);

    useEffect(() => {
        if (setValue) {
            setValue(number);
        }
    }, [number]);

    const handleValueChange = useCallback((value) => {
        setNumber(value);
    }, []);

    return (
        <TextField
            label={label}
            placeholder="0"
            type="number"
            value={number}
            disabled={setValue ? false : true}
            autoFocus={autoFocus ? autoFocus : false}
            align="right"
            onChange={handleValueChange}
        />
    );
}