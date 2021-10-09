import React, { useCallback, useState, useEffect } from 'react';
import { Modal, TextContainer } from '@shopify/polaris';

export default function ConfirmModal({ open, content, action, important, callback, closeConfirmModal }) {

    const [active, setActive] = useState(false);
    const [title, setTitle] = useState(action ? action : '実行');
    const [danger, setDanger] = useState(important ? important : false);

    useEffect(() => {
        setActive(open);
    });

    const handleModalChange = useCallback(() => setActive(!active), [active]);

    const handleClose = () => {
        handleModalChange();
        closeConfirmModal();
    };

    const handleAction = () => {
        closeConfirmModal();
        callback();
    }

    return (

        <Modal
            open={active}
            onClose={handleClose}
            title="確認"
            primaryAction={{
                destructive: danger,
                content: title,
                onAction: handleAction,
            }}
            secondaryActions={[
                {
                    content: 'キャンセル',
                    onAction: handleClose,
                },
            ]}
        >
            <Modal.Section>
                <TextContainer>
                    <p>
                        {content}
                    </p>
                </TextContainer>
            </Modal.Section>
        </Modal>
    );
}