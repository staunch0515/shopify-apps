import React, { useContext, useState, useEffect } from 'react';
import {
    Redirect
} from '@shopify/app-bridge/actions';
import {
    Context
} from '@shopify/app-bridge-react';
import {
    Tooltip,
    Link,
    TextStyle,
} from '@shopify/polaris';
import {
    CustomersMajorMonotone,
} from '@shopify/polaris-icons';

export default ({ gid, label }) => {

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

    return (<Link
        external
        onClick={onClick}>
        <Tooltip
            content="顧客管理に移動します"
            preferredPosition="above">
            <TextStyle>{label ? label : gid}</TextStyle>
        </Tooltip>
    </Link>);
}


