import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Page, Layout, Form, FormLayout, Card, Banner, FooterHelp, TextStyle, Link } from '@shopify/polaris';
import { ActionTypes, fetchData, actionSubmit } from '../../store/action'

{/*   */ }
import Help from './help';
import MainContext from '../../../../components/context/MainContext';
import { PageList } from '../../common/pagelist';
import EditForm from './edit.js'

const Index = (props) => {

  const [account, setAccount] = useState(null);

  const handleSubmit = (data) => {
    const { fetchData, actionSubmit } = props;
    if (data.uid === undefined) {
      actionSubmit('/account/new', data,);
    } else {
      actionSubmit('/account/update', data);
    }
  };

  return (
    <Page
      title={props.title}>
      <Layout sectioned={false}>
        <Layout.Section>
          <Banner title="Order archived" onDismiss={() => { }}>
            <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
          </Banner>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Card.Section>
              <EditForm account={account} onSubmit={handleSubmit}></EditForm>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Help></Help>
        </Layout.Section>
      </Layout>
      <FooterHelp>
        Learn more about{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
      </Link>
      </FooterHelp>
    </Page>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps");
  console.log(ownProps);
  console.log(state);
  return {
    ...ownProps,
    ...state,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: (...args) => dispatch(fetchData(...args)),
  actionSubmit: (...args) => dispatch(actionSubmit(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);