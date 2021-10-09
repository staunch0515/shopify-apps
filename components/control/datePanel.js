import React, { useCallback, useState, useEffect } from 'react';
import { DatePicker, TextField, TextStyle, Popover, Button, FormLayout, ButtonGroup } from '@shopify/polaris';
import {
    CalendarMinor,
} from '@shopify/polaris-icons';
import moment from 'moment';

export default function DatePanel({ value, setValue }) {

    let defaultdate = new Date();
    try {
        if (value) {
            defaultdate = new Date(value);
        }
    } catch (e) {
        console.log(" error ", e);
    }

    const [{ month, year }, setDate] = useState({
        month: defaultdate.getMonth(),
        year: defaultdate.getUTCFullYear(),
    });

    const [selectedDates, setSelectedDates] = useState({
        start: defaultdate,
        end: defaultdate,
    })

    const handleSelectedChanged = useCallback((newValue) => {
        const newDate = newValue.start;
        newDate.setHours(0, 0, 0, 0);
        setSelectedDates({ start: newValue.start, end: newValue.start });
        setValue(newDate);
    }, []);

    const handleMonthChange = useCallback(
        (month, year) => setDate({ month, year }),
        [],
    );

    return (
        <DatePicker
            month={month}
            year={year}
            onChange={handleSelectedChanged}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
        />
    );
}