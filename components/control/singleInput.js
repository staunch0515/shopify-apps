import React, { useCallback, useState, useEffect } from 'react';
import { RadioButton } from '@shopify/polaris';
import { Stack } from '@shopify/polaris';

export default function SingleInput({ label, value, setValue, options }) {
    const [radio, setRadio] = useState(value);

    const handleChange = useCallback(
        (_checked, newRadio) => {
            setRadio(newRadio);
            setValue(newRadio);
        },
        [],
    );

    return (
        <Stack vertical>{
            options.map(item => {
                <RadioButton
                    label={item.label}
                    checked={radio === item.radio}
                    id={item.radio}
                    name={label}
                    onChange={handleChange}
                />
            })
        }
        </Stack>
    );
}
