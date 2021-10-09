import React, { useState, useEffect } from 'react';
import { Modal } from '@shopify/app-bridge-react';

export default function ConfirmWindow({ open, title, message, callback }) {

    useEffect(() => {
        setCapital(open);
        setCapital(title);
        setContent(message);
    });

    const [active, setActive] = useState(open);
    const [capitcal, setCapital] = useState(title);
    const [content, setContent] = useState(message);

    const handleAction = (confirmed) => {
        if (callback) {
            callback(confirmed);
        }
    };

    return (<Modal
        open={active}
        title={capitcal}
        size="Small"
        message={content}
        primaryAction={{
            content: '実行',
            onAction: () => handleAction(true),
        }}
        secondaryActions={[
            {
                content: 'キャンセル',
                onAction: () => handleAction(false),
            },
        ]}
        onClose={() => () => handleAction(false)}
    />);
} 