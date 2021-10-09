import React, { useCallback, useState, useEffect } from 'react';
import { DatePicker, TextField, TextStyle, Popover, Button, FormLayout, ButtonGroup } from '@shopify/polaris';
import {
    CalendarMinor,
} from '@shopify/polaris-icons';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';

export default function DatePanel({ value, setValue }) {

    let start = new Date(moment().format("YYYY-MM-DD"));
    let end = start;
    try {
        start = new Date(start.getTime() - (7 * 24 * 60 * 60 * 1000));
        if (value) {
            start = new Date(value.startDate);
        }
        if (value) {
            end = new Date(value.endDate);
        }
        if (value == null) {
            setValue({
                startDate: start,
                endDate: end,
            });
        }
    } catch (e) {
        console.log(" error ", e);
    }

    const [{ month, year }, setDate] = useState({
        month: start.getMonth(),
        year: start.getUTCFullYear(),
    });

    const [selectedDates, setSelectedDates] = useState({
        start: start,
        end: end,
    })

    const handleSelectedChanged = useCallback((newValue) => {
        const newDate = newValue.start.toLocaleDateString();
        console.log(" handleSelectedChanged ", newDate);

        setSelectedDates({ start: newValue.start, end: newValue.start });
        if (setValue) {
            setValue({
                startDate: newValue.start,
                endDate: newValue.end,
            });
        }
    }, []);

    const handleMonthChange = useCallback(
        (month, year) => setDate({ month, year }),
        [],
    );

    return (
        <DatePicker
            month={month}
            year={year}
            allowRange={true}
            onChange={handleSelectedChanged}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
        />
    );
}