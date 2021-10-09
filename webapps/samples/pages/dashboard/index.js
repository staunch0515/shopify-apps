import React, { useContext, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import {
    Layout, Page, Card, TextStyle, Button, Banner, FooterHelp, Link, Heading,
    TextContainer, DataTable
} from '@shopify/polaris';

import {
    ActionTypes,
    fetchData,
    actionSubmit,
} from '../../store/action'
import MainContext from '../../../../components/context/MainContext';



const FETCT_ACTION_TEST = 'test.Index';

const Index = (props) => {

    const { title, fetchData } = props;
    const { showToast } = useContext(MainContext);

    console.log("Index props:", props);

    useEffect(() => {
        console.log("useEffect ....", props.data.message);
        if (props.data.message) {
            showToast(props.data.message)
        }
    }, [props.data.message]);

    const handleTest = (e) => {
        e.preventDefault();
        fetchData(FETCT_ACTION_TEST, {});
    }

    const rows = [
        ['Emerald Silk Gown', 'yen', '$875.00', '06/23/2020'],
        ['Mauve Cashmere Scarf', 'yen', '$230.00', '06/23/2020'],
        ['Navy s and yellow belt', 'yen', '$445.00', '06/23/2020'],
    ];

    const handleCreateAccount = () => {

    }
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Banner title="Order archived" onDismiss={() => { }}>
                        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
                    </Banner>
                </Layout.Section>
                <Layout.Section >
                    <Card title={title} sectioned>
                        <Card.Section>
                            <TextStyle>lang:{props.lang}</TextStyle>
                            <br>
                            </br>
                            <TextStyle>{props.i18n.translate('Index.heading')}</TextStyle>
                            <Button
                                loading={props.loading}
                                onClick={handleTest}
                            >Test</Button>
                        </Card.Section>
                        <Card.Section>
                            <TextContainer spacing="tight">
                                <Heading>Install the Shopify POS App</Heading>
                                <p>
                                    Shopify POS is the easiest way to sell your products in person. Available
                                    for iPad, iPhone, and Android.
  </p>
                            </TextContainer>
                        </Card.Section>
                    </Card>
                </Layout.Section>
                <Layout.Section oneHalf>
                    <Card title="账户情况" actions={[{ content: '账户管理', onAction: handleCreateAccount }]}>
                        <Card.Section>
                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'text',
                                    'numeric',
                                    'text',
                                ]}
                                headings={[
                                    'Product',
                                    'Currency',
                                    'Balance',
                                    'LastDate',
                                ]}
                                rows={rows}
                            />
                        </Card.Section>
                    </Card>
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

const FrmTypeList = connect(mapStateToProps, mapDispatchToProps)(Index);

export default FrmTypeList;