import React, { useCallback, useState, useEffect } from 'react';
import { FormLayout, TextStyle, TextField, Button, Checkbox } from '@shopify/polaris';

export default function TextInput({ label, text, setValue, autoFocus }) {

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
            setTextFieldValue(value);

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
            maxLength={100}
            minLength={2}
            disabled={setValue ? false : true}
            autoFocus={autoFocus ? autoFocus : false}
            align="left"
            onChange={handleTextFieldChange}
            error={errorMsg}
        />
    );
}