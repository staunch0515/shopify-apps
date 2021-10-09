import FrmTypeList from '../pages/frmtype-list/index';

import BlankPage from './blank';

const Image = ({ }) => {
    return (<p></p>);
}

export default Image;

export const PageList = {
    FRMTYPE_LIST: {
        id: 'frmtype-list',
        title: '全体設定',
        menu: true,
        url: '/frmtype-list/index',
        openComponent: (props) => {
            return <FrmTypeList {...props}></FrmTypeList>
        },
        options: {},
    },
    FRMTYPE_NEW: {
        id: 'frmtype-new',
        title: '新規フォーム種別',
        menu: false,
        url: '/frmtype-new/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        }
    },
    FRMTYPE_EDIT: {
        id: 'frmtype-edit',
        title: '編集フォーム種別',
        menu: false,
        url: '/frmtype-edit/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        }
    },
    FRMSTATUS_NEW: {
        id: 'frmstatus-new',
        title: '新規ステータス',
        menu: false,
        url: '/frmstatus-new/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        },
    },
    FRMSTATUS_EDIT: {
        id: 'frmstatus-edit',
        title: '編集ステータス',
        menu: false,
        url: '/frmstatus-edit/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        },
    },
    FRM_NEW: {
        id: 'frm-new',
        title: 'フォーム登録',
        menu: true,
        url: '/frm-new/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        },
    },
    FRM_LIST: {
        id: 'frm-list',
        title: 'フォーム一覧',
        menu: true,
        url: '/frm-list/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        },
    },
    FRM_EDIT: {
        id: 'frm-edit',
        title: 'フォーム編集',
        menu: false,
        url: '/frm-edit/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        },
    },
    ANS_LIST: {
        id: 'ans-list',
        title: '回答一覧',
        menu: true,
        url: '/ans-list/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        },
    },
    ANS_DETAIL: {
        id: 'ans-detail',
        title: '回答詳細',
        url: '/ans-detail/index',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        },
    },
}