import React, { useContext, useState, useEffect } from 'react';
import { TitleBar, Button, Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

export default ({ title, menus }) => {

    const [path, setPath] = useState('');

    const app = useContext(Context);

    useEffect(() => {
        if (path != '') {
            const redirect = Redirect.create(app);
            redirect.dispatch(Redirect.Action.APP, path);
        }
    }, [path]);

    return (
        <Context.Consumer>
            {app => {
                if (app) {

                    let secondary = [];

                    menus.map((menu) => {
                        const button = Button.create(app, { label: menu.title });

                        const redirect = Redirect.create(app);
                        button.subscribe('click', () => {
                            const redirect = Redirect.create(app);
                            redirect.dispatch(Redirect.Action.APP, menu.path);
                        });

                        secondary.push(button);
                    });

                    const titleBarOptions = {
                        title: title,
                        buttons: {
                            secondary: secondary,
                        },
                    };
                    TitleBar.create(app, titleBarOptions);
                }
                return null;
            }}
        </Context.Consumer>
    )
}


