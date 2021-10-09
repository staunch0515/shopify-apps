import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Page, Layout, Form, FormLayout, Card, Banner, FooterHelp, TextStyle, Link, PageActions } from '@shopify/polaris';
import { ActionTypes, fetchData, actionSubmit } from '../../store/action'

{/*   */ }
import Help from './help';
import MainContext from '../../../../components/context/MainContext';
import { PageList } from '../../common/pagelist';
import ListSection from './list.js'


const Index = (props) => {

  const [account, setAccount] = useState(null);

  const handleSubmit = (data) => {
    const { fetchData, actionSubmit } = props;
    if (data.uid === undefined) {
    } else {
    }
  };

  return (
    <Page title={props.title}>
      <Layout sectioned={false}>
        <Layout.Section>
          <Banner title="Order archived" onDismiss={() => { }}>
            <p>.</p>
          </Banner>
        </Layout.Section>
        <Layout.Section primary>
          <ListSection></ListSection>
        </Layout.Section>
        <Layout.Section secondary>
          <Help></Help>
        </Layout.Section>
        <Layout.Section>
          <PageActions
            primaryAction={{
              content: 'New',
            }}
          />
          <FooterHelp>
            Learn more about{' '}
            <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
              fulfilling orders
      </Link>
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default Index;