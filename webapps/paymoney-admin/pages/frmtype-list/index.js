import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Page, Card, TextStyle, Button } from '@shopify/polaris';

import {
    ActionTypes,
    fetchData,
    actionSubmit,
} from '../../store/action'
import MainContext from '../../../../components/context/MainContext';

const FETCT_ACTION_TEST = 'test.Index';

const Index = (props) => {
    const { title, fetchData } = props;
    const context = useContext(MainContext);

    useEffect(() => {
        fetchData(FETCT_ACTION_TEST, {});
    }, []);

    return (
        <Page fullWidth >
            <Layout>
                <Layout.Section>
                    <Card title={title} sectioned>
                        <Card.Section>
                            <TextStyle>欢迎使用我的App。</TextStyle>
                            <Button ></Button>
                        </Card.Section>
                    </Card>
                </Layout.Section>
            </Layout>
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