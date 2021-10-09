import React, { useCallback, useState, useEffect } from 'react';
import { Layout, Page, FormLayout, Card, Button, TextStyle, DataTable, TextField, Banner, FooterHelp, Link } from '@shopify/polaris';
import { connect } from 'react-redux';

import { ActionTypes, fetchData, actionSubmit } from '../../store/action'

import MainContext from '../../../../components/context/MainContext';
import Pagebar from '../../../../components/list/pagebar'

import SettingButton from '../../../../components/actions/toggle.js'



const rows = [
    ['Emerald Silk Gown', '$875.00', '06/23/2020'],
    ['Mauve Cashmere Scarf', '$230.00', '06/23/2020'],
    ['Navy s and yellow belt', '$445.00', '06/23/2020'],
];


const Index = (props) => {

    const i18n = (sid) => {
        return props.i18n.translate(sid)
    }

    return (
        <Page title={props.title}>
            <Layout>
                <Layout.Section>
                    <Banner title="Order archived" onDismiss={() => { }}>
                        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
                    </Banner>
                </Layout.Section>
                <Layout.AnnotatedSection
                    title={i18n('Index.heading')}
                    description="Shopify and your customers will use this information to contact you.">
                    <SettingButton></SettingButton>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title={i18n('Index.xheading')}
                    description="Shopify and your customers will use this information to contact you.">
                    <Card sectioned>
                        <FormLayout>
                            <TextField label={i18n('Setting.heading')} onChange={() => { }} />
                            <TextField type="email" label="Account email" onChange={() => { }} />
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title={i18n('Setting.voucher.title')}
                    description={i18n('Setting.account.description')}>
                    <Card actions={[{ content: i18n('Setting.action.create') }]}>
                        <Card.Section>
                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'numeric',
                                    'text',
                                ]}
                                headings={[
                                    'Product',
                                    'Balance',
                                    'LastDate',
                                ]}
                                rows={rows}
                            />
                        </Card.Section>
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title={i18n('Setting.event.title')}
                    description={i18n('Setting.event.description')}>
                    <Card actions={[{ content: i18n('Setting.action.create') }]}>
                        <Card.Section>
                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'numeric',
                                    'text',
                                ]}
                                headings={[
                                    'Product',
                                    'Balance',
                                    'LastDate',
                                ]}
                                rows={rows}
                            />
                        </Card.Section>
                    </Card>
                </Layout.AnnotatedSection>
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