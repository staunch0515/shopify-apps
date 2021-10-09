import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Redirect, History } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';
import {
    Tabs
} from '@shopify/polaris';

import { MainProvider } from '../context/MainContext';

function MainLayout(props) {

    const app = useContext(Context);
    console.log("props", props);
    const { pages } = props;

    const [componentProps, setComponentProps] = useState({});
    const [tablist, setTablist] = useState([]);
    const [menulist, setMenulist] = useState([]);

    const getSelectedIndex = (list, url) => {
        let curIndex = 0;
        list.map((menu, index) => {
            if (menu.page.url) {
                if (url.startsWith(menu.page.url)) {
                    curIndex = index;
                }
            }
        });
        console.log("getSelectedIndex", url)
        console.log("curIndex", curIndex)
        return curIndex;
    };

    const [selected, setSelected] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null);
    const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

    const init = () => {
        const _tablist = [];
        const _menulist = [];

        for (var key in pages) {
            const page = pages[key];
            let menu = {
                id: page.id,
                content: page.title[props.lang],
                page: page,
                openComponent: page.openComponent,
            }
            _tablist.push(menu);
            if (page.menu) {
                _menulist.push(menu);
            }
        }
        setTablist(_tablist);
        setMenulist(_menulist);

        console.log("useEffect asPath", props.asPath);

        let initalIndex = getSelectedIndex(_menulist, props.asPath);
        let tabIndex = getSelectedIndex(_tablist, props.asPath);

        if (initalIndex) {
            setSelected(initalIndex);
            setSelectedPage(tablist[tabIndex]);
        } else {
            setSelected(0);
            setSelectedPage(tablist[0]);
        }
    }

    useEffect(() => {
        console.log("useEffect", menulist.length);
        if (menulist.length == 0) {
            init();
        } else {
            const page = menulist[selected].page;
            reSetPage(page);
        }
    }, [selected]);

    const handleRedirectUrl = (url, options) => {
        tablist.map(tab => {
            if (tab.url == url) {
                reSetPage(tab.page, options);
            }
        })
    };

    const handleRedirectPage = (pageInfo, options) => {
        console.log("handleRedirectPage",pageInfo);
        if (pageInfo) {
            reSetPage(pageInfo, options);
        } else {
            console.log("handleRedirectPage  pageInfo is null.", options);
        }
    };

    const reSetPage = (page, options) => {
        const pageInfo = {
            id: page.id,
            title: page.title[props.lang],
            url: page.url,
        }
        const pageProps = {
            ...pageInfo,
            ...page.options || {},
            ...props,
            ...options || {},
        }
        console.log("pageProps");
        console.log(pageProps);
        setComponentProps(pageProps);

        let menuIndex = null;
        menulist.map((menu, index) => {
            if (menu.page.id == page.id) {
                menuIndex = index;
            }
        });

        const history = History.create(app);
        history.dispatch(History.Action.REPLACE, page.url);

        setSelectedPage(page);
    }


    return (
        <MainProvider
            {...props}
            handleRedirectUrl={handleRedirectUrl}
            handleRedirectPage={handleRedirectPage}
        >
            <Tabs
                tabs={menulist}
                selected={selected}
                onSelect={handleTabChange}>
            </Tabs>
            {selectedPage ? selectedPage.openComponent(componentProps) : null}
        </MainProvider>
    )
}

export default MainLayout;