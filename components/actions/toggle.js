import React, { useCallback, useState, useEffect } from 'react';

import { SettingToggle, TextStyle } from '@shopify/polaris';


export default function SettingButton({ value, setValue }) {
    const [active, setActive] = useState(value);

    const handleToggle = useCallback(() => setActive((active) => !active), []);

    const contentStatus = active ? 'Disable' : 'Enable';
    const textStatus = active ? 'enabled' : 'disabled';

    useEffect(() => {
        if (setValue) {
            setValue(active);
        }
    }, [active])

    return (
        <SettingToggle
            action={{
                content: contentStatus,
                onAction: handleToggle,
            }}
            enabled={active}
        >
            This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
        </SettingToggle>
    );
}