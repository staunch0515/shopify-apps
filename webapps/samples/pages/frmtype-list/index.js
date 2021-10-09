import { Layout, Page, Spinner, Card, Button, TextStyle, Tooltip, Tabs, FooterHelp,Link } from '@shopify/polaris';
import { connect } from 'react-redux';

import { ActionTypes, fetchData, actionSubmit } from '../../store/action'

import MainContext from '../../../../components/context/MainContext';
import Pagebar from '../../../../components/list/pagebar'

import AccountFilter from './filter';
import AccountListSection from './list';
import SkeletonPage from './skeleton';
import {
    PlusMinor, ExportMinor, ImportMinor
} from '@shopify/polaris-icons';


class AccountListComponent extends React.Component {

    static contextType = MainContext;

    constructor() {
        super();
        this.state = {
            loading: false,
            error: null,
            message: null,
            result: null,
            modal: false,
            pageno: 1,
            limit: 10,
        };
    }

    onSearch = (searchInput) => {
        searchInput.pageno = 1;
        // this.reset(searchInput);
    }

    reset = (queryInput) => {
        const { fetchData, showToast } = this.props;
        if (this.state.loading) {
            showToast("システムが検索しています，お待ちください。");
            return;
        }
        let searchInput = {
            ...queryInput,
            pageno: queryInput.pageno,
            limit: this.state.limit,
        }
        fetchData(searchInput);
        this.setState({
            pageno: 1,
            queryInput: queryInput,
        });
    }

    gotoPage = (pageno) => {
        reset({ pageno: pageno })
    }

    static getDerivedStateFromProps(props, state) {
        let action = "   あし";
        if (props.lastAction) {
            action = props.lastAction.type;
        }
        console.log("getDerivedStateFromProps lastAction:" + action);
        console.log(props)
        return {
            loading: props.loading,
            error: null,
            result: props.result,
        };
    }

    render() {
        return (
            <Page fullWidth title={this.props.title}
                primaryAction={
                    {
                        content: 'Create order',
                        icon: PlusMinor
                    }
                }
                secondaryActions={
                    [
                        {
                            content: 'Import',
                            icon: ImportMinor
                        },
                        {
                            content: 'Export',
                            icon: ExportMinor
                        },
                    ]
                }>
                <Layout>
                    <Layout.Section>
                        <Card>
                            <Tabs
                                tabs={[
                                    {
                                        id: 'all',
                                        content: '全部',
                                    },
                                    {
                                        id: 'finished',
                                        content: '完成的',
                                    },
                                ]}
                                selected={1}
                            >
                            </Tabs>
                            <AccountFilter
                                onSearch={this.onSearch}>
                            </AccountFilter>
                            {this.state.result ?
                                <AnsListSection
                                    title={this.state.title}
                                    result={this.state.result}
                                    queryInput={this.state.queryInput}
                                    redirectToProduct={this.redirectToProduct}>
                                </AnsListSection> : null}
                            {this.props.loading ?
                                <Card.Section>
                                    <center>
                                        <Spinner accessibilityLabel="" color="teal" size="large" />
                                    </center>
                                    <SkeletonPage></SkeletonPage>
                                </Card.Section>
                                : null}
                            {this.state.result && this.state.result.count > 0 ?
                                <Card.Section>
                                    <Pagebar
                                        limit={this.state.limit}
                                        pageno={this.state.pageno}
                                        total={this.state.result.count}
                                        gotoPage={this.gotoPage}>
                                    </Pagebar>
                                </Card.Section>
                                : null}
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
}

const mapStateToProps = state => {
    console.log("mapStateToProps");
    console.log(state);
    if (state.lastAction) {
        if (state.lastAction.type.startsWith(ActionTypes.SEARCH_ANS_LIST)) {
            console.log(state)
            const { loading, error, message, result } = state.enquite.resultState;
            return ({
                loading: loading,
                error: error,
                message: message,
                result: result,
                lastAction: state.lastAction,
            })
        }
    }
    return {};
};
const mapDispatchToProps = dispatch => ({
    fetchData: (...args) => dispatch(fetchData(...args)),
});

const AccountList = connect(mapStateToProps, mapDispatchToProps)(AccountListComponent);

export default AccountList;