import React, { useCallback, useState, useEffect } from 'react';
import { FormLayout, TextStyle, TextField, Button, Checkbox } from '@shopify/polaris';

export default function PhoneInput({ label, text, setValue }) {

    const [textFieldValue, setTextFieldValue] = useState(text);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setTextFieldValue(text);
    });

    const handleTextFieldChange = useCallback(
        (value) => {

            console.log("handleTextFieldChange  value:" + value);

            setErrorMsg("");
            var errMsg = "";
            // make sure valid character
            value = value.replace(/[^A-Za-z0-9]+/ig, '');

            setTextFieldValue(value);
            if (value === "") {
                errMsg = "必須項目です";
            }

            if (value.length < 2) {
                errMsg = "必須項目です";
            }

            if (errMsg != "") {
                setErrorMsg(errMsg);
                if (setValue) {
                    setValue(value, false);
                }
            } else {
                if (setValue) {
                    setValue(value, true);
                }
            }
        },
        [],
    );

    return (
        <TextField
            label={label}
            placeholder="入力してください"
            value={textFieldValue}
            maxLength={20}
            minLength={2}
            disabled={setValue ? false : true}
            autoFocus={true}
            align="left"
            onChange={handleTextFieldChange}
            error={errorMsg}
        />
    );
}