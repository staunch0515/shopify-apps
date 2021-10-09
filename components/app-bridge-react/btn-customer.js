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
    Icon,
} from '@shopify/polaris';
import {
    CustomersMajorMonotone,
} from '@shopify/polaris-icons';

export default ({ gid }) => {

    const app = useContext(Context);

    const onClick = (e) => {
        e.preventDefault();
        const id = gid;
        if (gid.lastIndexOf("/") > 0) {
            id = gid.slice(gid.lastIndexOf("/") + 1);
        }
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
            name: Redirect.ResourceType.Customer,
            resource: {
                id: id,
            },
        });
    };

    return (<Button
        size="slim"
        icon={CustomersMajorMonotone}
        onClick={onClick}>
        <Tooltip
            content="顧客管理"
            preferredPosition="above">
        </Tooltip>
    </Button>);
}


