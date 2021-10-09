import React, { useCallback, useState, useEffect } from 'react';
import { FormLayout, TextStyle, TextField, Button, Checkbox } from '@shopify/polaris';

export default function CodeInput({ label, name, value, setValue, setChange, required, disabled }) {

    const [text, setText] = useState(value);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {

        let errMsg = null;

        if (text) {
            if (text === "") {
                errMsg = "必須項目です";
            }

            if (text.length < 2) {
                errMsg = "必須項目です";
            }
        }

        let _valid = true;
        if (errMsg) {
            _valid = false;
        } else {
            if (required) {
                _valid = text ? true : false;
            }
        }

        if (setValue) {
            setValue(text, _valid);
        }

        if (setChange) {
            setChange(name, text, _valid);
        }

    }, [text]);

    const handleChange = useCallback((value) => {

        value = value.replace(/[^A-Za-z0-9]+/ig, '');

        setText(value);

    }, []);


    return (
        <TextField
            label={label}
            placeholder="入力してください"
            value={text}
            maxLength={20}
            minLength={2}
            autoFocus={true}
            align="left"
            onChange={handleChange}
            error={errorMsg}
            disabled={disabled}
            helpText="半角英数字・2～20文字"
        />
    );
}