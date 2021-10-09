import fetch from 'node-fetch';
import App from 'next/app';
import Head from 'next/head';

import Cookies from 'universal-cookie';

import { Provider as ShopifyProvider, Modal } from '@shopify/app-bridge-react';
import { AppProvider, TextStyle } from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import translations from '@shopify/polaris/locales/ja.json';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  fetch: fetch,
  fetchOptions: {
    credentials: 'include'
  },
  cache: new InMemoryCache(),
});

import { I18nContext, I18nManager } from '@shopify/react-i18n';

class MyApp extends App {

  state = {
    modal: {
      title: 'default',
      show: false,
      message: 'default',
      size: 'Large',
      callback: (confirmed) => { },
    },
  }

  showMessage = (title, message, callback) => {
    console.log('showMessage      ' + message);
    this.setState({
      modal: {
        title: title,
        show: true,
        message: message,
        size: 'Small',
        scr: '',
        callback: (confirmed) => {
          this.setState({
            modal: {
              title: '',
              message: '',
              show: false,
            }
          });
          if (confirmed && callback) {
            callback();
          }
        },
      }
    });
  };

  confirmAction = (action, message, callback) => {
    console.log('showMessage      ' + message);
    this.setState({
      modal: {
        title: "確認",
        show: true,
        message: message,
        size: 'Small',
        action: action,
        danger: true,
        scr: '',
        callback: (confirmed) => {
          this.setState({
            modal: {
              title: '',
              message: '',
              show: false,
            }
          });
          if (confirmed && callback) {
            callback();
          }
        },
      }
    });
  };

  render() {
    const { Component, pageProps, router, cookies } = this.props;

    //
    const query = router.query;
    const lang = query.locale ? query.locale.substring(0, 2) : "en";
    const shop = query.shop;
    const route = router.route;
    const asPath = router.asPath;
    const pathname = router.pathname;
    console.log("lang", lang);
    console.log("asPath", asPath);
    console.log("pathnaame", pathname);
    console.log("route", route);

    const locale = lang;

    const i18nManager = new I18nManager({
      locale,
      onError(error) {
      },
    });

    const config = {
      apiKey: API_KEY,
      shopOrigin: cookies.shopOrigin,
      accessToken: cookies.accessToken,
      forceRedirect: false,
    };
    return (
      <React.Fragment>
        <Head>
          <title>{APP_TITLE}</title>
          <meta charSet='utf-8' />
        </Head>
        <ShopifyProvider config={config}>
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <I18nContext.Provider value={i18nManager}>
                <Component
                  {...pageProps}
                  router={router}
                  query={query}
                  lang={lang}
                  route={route}
                  shop={shop}
                  asPath={asPath}
                  pathname={pathname}
                  showMessage={this.showMessage}
                  confirmAction={this.confirmAction} />
              </I18nContext.Provider>
            </ApolloProvider>
          </AppProvider>
          <center><TextStyle>Version：1.1</TextStyle></center>
          <Modal
            open={this.state.modal.show}
            title={this.state.modal.title}
            message={this.state.modal.message}
            primaryAction={{
              content: this.state.modal.action ? this.state.modal.action : '実行',
              destructive: this.state.modal.danger,
              onAction: () => this.state.modal.callback(true),
            }}
            secondaryActions={[
              {
                content: 'キャンセル',
                onAction: () => this.state.modal.callback(false),
              },
            ]}
          >
          </Modal>
        </ShopifyProvider>
      </React.Fragment >
    );
  }
}

MyApp.getInitialProps = async (appContext) => {
  console.log("-----------------------------------------")
  const appProps = await App.getInitialProps(appContext);
  const cookiesService = new Cookies(appContext.ctx.req.headers.cookie);
  let cookies = cookiesService.getAll();
  return { ...appProps, cookies }
}

export default MyApp;