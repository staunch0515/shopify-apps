import React, { useContext, useState, useEffect } from 'react';
import {
    Redirect
} from '@shopify/app-bridge/actions';
import {
    Context
} from '@shopify/app-bridge-react';
import {
    Button,
    Tooltip,
} from '@shopify/polaris';
import {
    DraftOrdersMajorMonotone,
} from '@shopify/polaris-icons';

export default ({ gid }) => {

    const app = useContext(Context);

    const onClick = (e) => {
        e.preventDefault();
        const id = gid;
        if (gid.lastIndexOf("/") > 0) {
            id = gid.slice(gid.lastIndexOf("/") + 1);
        }
        console.log("order btn id=" + id);
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
            name: Redirect.ResourceType.Order,
            resource: {
                id: id,
            },
        });
    };

    return (<Button
        size="slim"
        icon={DraftOrdersMajorMonotone}
        onClick={onClick}>
        <Tooltip
            content="注文管理"
            preferredPosition="above">
        </Tooltip>
    </Button>);
}


