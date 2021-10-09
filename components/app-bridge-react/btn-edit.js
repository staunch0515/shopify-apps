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
    EditMajorMonotone,
} from '@shopify/polaris-icons';

import store from 'store-js';

import MainContext from '../context/MainContext';

export default ({ item, path }) => {

    const context = useContext(MainContext);

    const onClick = (e) => {
        e.preventDefault();
        store.set('item', item);
        const redirectPage = context.redirectPage;
        redirectPage(path);
    };

    return (<Button
        size="slim"
        icon={EditMajorMonotone}
        onClick={onClick}>
        <Tooltip
            content="編集"
            preferredPosition="above">
        </Tooltip>
    </Button>);
}


