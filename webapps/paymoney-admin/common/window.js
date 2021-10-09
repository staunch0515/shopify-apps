import withRedux from 'next-redux-wrapper';
import { Provider as ReduxProvider } from 'react-redux';

import { PageList } from './pagelist';

import MainLayout from '../../../components/layout/MainLayout';
import configureStore from '../store/store'

function Window(props) {
    const { store } = props;
    return (
        <ReduxProvider store={store}>
            <MainLayout
                pages={PageList}
                {...props}
            >
            </MainLayout>
        </ReduxProvider>
    )
}
export default withRedux(configureStore, { debug: true })(Window);