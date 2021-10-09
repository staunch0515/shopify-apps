import withRedux from 'next-redux-wrapper';
import { Provider as ReduxProvider } from 'react-redux';

import { PageList } from './pagelist';

import MainLayout from '../../../components/layout/MainLayout';
import configureStore from '../store/store'

import { useI18n } from '@shopify/react-i18n';

import en from '../locales/en.json';
import zh from '../locales/zh.json';


function Window(props) {
    const { store } = props;

    const [i18n] = useI18n({
        id: 'Index',
        fallback: props.lang,
        translations(locale) {
            locale = props.lang;
            if (locale === 'en') {
                return en;
            } else if (locale === 'zh') {
                return zh;
            }
            return en;
        },
    });

    return (
        <ReduxProvider store={store}>
            <MainLayout
                pages={PageList}
                i18n={i18n}
                {...props}>
            </MainLayout>
        </ReduxProvider>
    )
}
export default withRedux(configureStore, { debug: true })(Window);