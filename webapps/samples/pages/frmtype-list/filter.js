import React, { useCallback, useEffect, useState } from 'react';
import {
    Card,
    Stack,
    TextField,
    RadioButton,
    Filters
} from '@shopify/polaris';
import moment from 'moment';
import DateRange from '../../../../components/control/dateRange.js'

export default function AccountFilter({ onSearch }) {

    moment.locale('ja');

    const [queryValue, setQueryValue] = useState(null);//(orderNo)
    const [custIdOfShop, setCustIdOfShop] = useState(null);//顧客ID
    const [fullName, setFullName] = useState(null);//顧客氏名
    const [email, setEmail] = useState(null);//email
    const [hasFinish, setHasFinish] = useState(null);//終了hasFinish
    const [ansDate, setAnsDate] = useState(null);//回答期間
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleHasFinishRemove = useCallback(() => setHasFinish(null), []);
    const handleAnsDateRemove = useCallback(() => setAnsDate(null), []);
    const handleCustIdOfShopRemove = useCallback(() => setCustIdOfShop(null), []);
    const handleFullNameRemove = useCallback(() => setFullName(null), []);
    const handleEmailRemove = useCallback(() => setEmail(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);

    const handleCustIdOfShopChange = useCallback((value) => setCustIdOfShop(value), []);
    const handleFullNameChange = useCallback((value) => setFullName(value), []);
    const handleEmailChange = useCallback((value) => setEmail(value), []);
    const handleHasFinishChange = useCallback((_checked, newValue) => { setHasFinish(newValue); }, []);
    const handleAnsDateChange = useCallback((value) => {
        setAnsDate(value);
        setStartDate(value.startDate);
        setEndDate(value.endDate);
    }, []);
    const handleFiltersQueryChange = useCallback((value) => { setQueryValue(value); }, []);

    const handleFiltersClearAll = useCallback(() => {
        handleQueryValueRemove();
        handleHasFinishRemove();
        handleAnsDateRemove();
        handleCustIdOfShopRemove();
        handleFullNameRemove();
        handleEmailRemove();
    }, [
        handleQueryValueRemove,
        handleHasFinishRemove,
        handleAnsDateRemove,
        handleFullNameRemove,
        handleEmailRemove,
    ]);

    console.log("   filter ");
    useEffect(() => {

        console.log("   filter  useEffect ");

        let searchInput = {};

        if (queryValue) {
            searchInput.title = queryValue;//orderNo
        }
        if (hasFinish) {
            searchInput.hasFinish = hasFinish;
        }
        if (custIdOfShop) {
            searchInput.custId = custIdOfShop;
        }
        if (fullName) {
            searchInput.fullName = fullName;
        }
        if (email) {
            searchInput.email = email;
        }
        if (ansDate) {
            searchInput.startAnsDate = startDate;
            searchInput.endAnsDate = endDate;
        }

        if (onSearch) {
            onSearch(searchInput);
        }
    }, [queryValue, hasFinish, fullName, custIdOfShop, email, startDate, endDate]);

    const filters = [
        {
            key: 'ansDate',
            label: '回答期間',
            filter: (
                <DateRange
                    value={ansDate}
                    setValue={handleAnsDateChange}
                />
            ),
            shortcut: true,
        },
        {
            key: 'custIdOfShop',
            label: '顧客ID',
            filter: (
                <TextField
                    value={custIdOfShop}
                    onChange={handleCustIdOfShopChange}
                    labelHidden
                />
            ),
            shortcut: true,
        },
        {
            key: 'fullName',
            label: '顧客氏名',
            filter: (
                <TextField
                    value={fullName}
                    onChange={handleFullNameChange}
                    labelHidden
                />
            ),
            shortcut: true,
        },
        {
            key: 'email',
            label: '顧客メールアドレス',
            filter: (
                <TextField
                    value={email}
                    onChange={handleEmailChange}
                    labelHidden
                />
            ),
            shortcut: true,
        },
        {
            key: 'hasFinish',
            label: '終了状態',
            filter: (
                <Stack vertical>
                    <RadioButton
                        label="終了"
                        id="true"
                        name="canSubscription1"
                        checked={hasFinish === 'true'}
                        onChange={handleHasFinishChange}
                    />
                    <RadioButton
                        label="未終了"
                        checked={hasFinish === 'false'}
                        id="false"
                        name="canSubscription1"
                        onChange={handleHasFinishChange}
                    />
                </Stack>
            ),
        },
    ];

    const appliedFilters = [];

    //顧客/ID
    if (!isEmpty(custIdOfShop)) {
        const key = 'custIdOfShop';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, custIdOfShop),
            onRemove: handleCustIdOfShopRemove,
        });
    }
    //顧客氏名
    if (!isEmpty(fullName)) {
        const key = 'fullName';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, fullName),
            onRemove: handleFullNameRemove,
        });
    }
    //email
    if (!isEmpty(email)) {
        const key = 'email';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, email),
            onRemove: handleEmailRemove,
        });
    }
    //回答期間
    if (!isEmpty(ansDate)) {
        const key = 'ansDate';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, ansDate),
            onRemove: handleAnsDateRemove,
        });
    }

    //終了
    if (!isEmpty(hasFinish)) {
        const key = 'hasFinish';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, hasFinish),
            onRemove: handleHasFinishRemove,
        });
    }
    return (
        <Card.Section>
            <Filters
                queryValue={queryValue}
                filters={filters}
                appliedFilters={appliedFilters}
                onQueryChange={handleFiltersQueryChange}
                onQueryClear={handleQueryValueRemove}
                onClearAll={handleFiltersClearAll}
                helpText="フォームタイトルを入力してください"
            />
        </Card.Section>
    );

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'custIdOfShop':
                return `顧客ID ${value}`;
            case 'fullName':
                return `顧客氏名 ${value}`;
            case 'email':
                return `顧客メールアドレス ${value}`;
            case 'hasFinish':
                return value == "true" ? '終了' : '未終了';
            case 'ansDate':
                const start = moment(value.startDate).format('YYYY年M月D日 (ddd) ');
                const end = moment(value.endDate).format('YYYY年M月D日 (ddd) ');
                return `回答期間 ${start}から　${end} まで　`;
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
}