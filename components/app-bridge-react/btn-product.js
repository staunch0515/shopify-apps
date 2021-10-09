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
    ProductsMajorMonotone,
} from '@shopify/polaris-icons';

export default ({ gid }) => {

    const app = useContext(Context);

    const onClick = (e) => {
        e.preventDefault();
        let id = gid;
        if (gid.lastIndexOf("/") > 0) {
            id = gid.slice(gid.lastIndexOf("/") + 1);
        }
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
            name: Redirect.ResourceType.Product,
            resource: {
                id: id,
            },
        });
    };

    return (<Button
        size="slim"
        icon={ProductsMajorMonotone}
        onClick={onClick}>
        <Tooltip
            content="商品管理"
            preferredPosition="above">
        </Tooltip>
    </Button>);
}


