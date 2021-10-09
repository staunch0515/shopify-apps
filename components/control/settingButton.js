import React, { useCallback, useState, useEffect } from 'react';
import { TextStyle, SettingToggle } from '@shopify/polaris';

export default function SettingButton() {
    const [active, setActive] = useState(false);

    const handleToggle = useCallback(() => setActive((active) => !active), []);

    const contentStatus = active ? '無効にする' : '有効にする';
    const textStatus = active ? '有効' : '無効';

    return (
        <SettingToggle
            action={{
                content: contentStatus,
                onAction: handleToggle,
            }}
            enabled={active}
        >
            このお支払い方法 <TextStyle variation="strong">{textStatus}</TextStyle>.
        </SettingToggle>
    );
}