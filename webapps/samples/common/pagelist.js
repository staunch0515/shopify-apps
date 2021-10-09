import React, { lazy } from 'react';

import DashBoard from '../pages/dashboard/index';
import FrmTypeList from '../pages/frmtype-list/index';
import SettingPage from '../pages/setting/index';
import AccountEditPage from '../pages/account-edit/index';
import AccountListPage from '../pages/account-list/index';

import SamplePage from '../pages/page/index';

import BlankPage from './blank';

export const PageList = {
    DASHBOARD: {
        id: 'start',
        title: {
            en: 'Start',
            zh: '开始',
            ja: 'スタート',
        },
        menu: true,
        url: '/dashboard',
        openComponent: (props) => {
            return <DashBoard {...props}></DashBoard>
        },
        options: {},
    },
    ACCOUNT_LIST: {
        id: 'account-list',
        title: {
            en: 'Account List',
            zh: '账户管理',
            ja: 'フォーム'
        },
        menu: true,
        url: '/account-list',
        openComponent: (props) => {
            return <AccountListPage {...props}></AccountListPage>
        },
        options: {},
    },
    ACCOUNT_NEW: {
        id: 'account-new',
        title: {
            en: 'Create Account',
            zh: '新建账户',
            ja: '新規フォーム'
        },
        menu: false,
        url: '/account-new',
        openComponent: (props) => {
            return <AccountEditPage {...props}></AccountEditPage>
        },
        options: {},
    },
    ACCOUNT_EDIT: {
        id: 'account-edit',
        title: {
            en: 'Account Edit',
            zh: '账户管理',
            ja: 'フォーム'
        },
        menu: false,
        url: '/account-edit',
        openComponent: (props) => {
            return <AccountEditPage {...props}></AccountEditPage>
        },
        options: {},
    },
    LIST_PAGE: {
        id: 'page-list',
        title: {
            en: 'List Page',
            zh: '数据查询',
            ja: 'フォーム一覧'
        },
        menu: true,
        url: '/list',
        openComponent: (props) => {
            return <FrmTypeList {...props}></FrmTypeList>
        },
        options: {},
    },
    DETAIL_PAGE: {
        id: 'detail',
        title: {
            en: 'Detail',
            zh: '详细',
            ja: 'ディテール',
        },
        menu: true,
        url: '/detail',
        openComponent: (props) => {
            return <SamplePage {...props}></SamplePage>
        },
        options: {

        }
    },
    SETTING: {
        id: 'setting',
        title: {
            en: 'Setting',
            zh: '设定',
            ja: '設定',
        },
        menu: true,
        url: '/setting',
        openComponent: (props) => {
            return <SettingPage {...props}></SettingPage>;
        },
        options: {

        }
    },
    EMPTY_PAGE: {
        id: 'empty-page',
        title: {
            en: 'Empty Page',
            zh: '空白页',
            ja: 'フォーム一覧'
        },
        menu: true,
        url: '/empty',
        openComponent: (props) => {
            return <BlankPage {...props}></BlankPage>
        },
        options: {

        }
    },
}