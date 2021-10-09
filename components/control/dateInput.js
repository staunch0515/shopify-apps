import React, { useCallback, useState, useEffect, useContext } from 'react';
import { DatePicker, TextField, TextStyle, Popover, Button, FormLayout, ButtonGroup } from '@shopify/polaris';
import {
    CalendarMinor,
} from '@shopify/polaris-icons';
import moment from 'moment';

import MainContext from '../context/MainContext';


export default function DateInput({ label, disabled, value, setValue, maxDate, minDate, autoFocus }) {

    const { showError } = useContext(MainContext);

    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => {
            setPopoverActive(!popoverActive);
        },
        [],
    );

    let defaultdate = new Date();
    try {
        if (value) {
            defaultdate = new Date(moment(value).startOf('day'));
        } else {
            if (setValue) {
                setValue(defaultdate);
            }
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
        console.log(" maxDate ", maxDate);

        const curDate = moment(newValue.start).format("YYYY-MM-DD");

        if (maxDate) {
            const maxDay = moment(maxDate).format("YYYY-MM-DD");
            if (curDate > maxDay) {
                showError("開始日は終了日より後の日付にすることはできません。");
                setPopoverActive(false);
                return;
            }
        }

        if (minDate) {
            const minDay = moment(minDate).format("YYYY-MM-DD");
            console.log("minDay", minDay);
            if (curDate < minDay) {
                showError("終了日には開始日より前の日付を指定してください。");
                setPopoverActive(false);
                return;
            }
        }

        setSelectedDates({ start: newValue.start, end: newValue.start });
        setPopoverActive(false);
        if (setValue) {
            setValue(curDate);
        }
    }, [maxDate, minDate]);



    const handleMonthChange = useCallback(
        (month, year) => setDate({ month, year }),
        []);

    const onFocus = () => {
        togglePopoverActive(true);
    }

    const showDate = (date) => {
        let year = date.getUTCFullYear();
        if (year < 1000) {
            year = year + 1900;
        }
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        return year + "/" + month + "/" + day;
    }

    const activator = (
        <ButtonGroup>
            <TextStyle>{label}</TextStyle>
            <TextField
                placeholder="入力してください"
                value={showDate(selectedDates.start)}
                maxLength={10}
                minLength={10}
                disabled={disabled ? true : false}
                onFocus={onFocus}
                autoFocus={autoFocus ? autoFocus : false}
                align="left"
            />
            <Button icon={CalendarMinor} onClick={togglePopoverActive}></Button>
        </ButtonGroup>
    );

    return (
        <Popover
            active={popoverActive}
            activator={activator}
            fluidContent={true}
            fullHeight={true}
            disabled={disabled ? true : false}
            preferredAlignment="left"
            onClose={togglePopoverActive}
        >
            <DatePicker
                month={month}
                year={year}
                onChange={handleSelectedChanged}
                onMonthChange={handleMonthChange}
                selected={selectedDates}
            />
        </Popover>
    );
}