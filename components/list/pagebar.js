import React, { useState, useEffect, useCallback } from 'react';
import { Pagination } from '@shopify/polaris';

export default function Pagebar({ limit, total, pageno, gotoPage }) {

    const [maxpage, setMaxPage] = useState(1);
    const [page, setPage] = useState(pageno);

    useEffect(() => {
        limit = limit || limit != 0 ? limit : 10;
        total = total ? total : 0;
        setMaxPage(Math.ceil(total / limit));
    }, []);

    const handleChange = useCallback((page) => {
        gotoPage(page);
    }, [page]);

    return (
        <Pagination
            label={maxpage > 0 ? (page + "/" + maxpage + " (合計:" + total + ")") : ""}
            hasPrevious={page > 1}
            onPrevious={() => {
                handleChange(page - 1);
            }}
            hasNext={page < maxpage}
            onNext={() => {
                handleChange(page + 1);
            }}
        />);
}