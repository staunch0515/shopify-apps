import React, { useCallback, useState, useEffect, useReducer } from 'react';
import {
    Form,
    FormLayout,
    Button
} from '@shopify/polaris';

import { Context } from '@shopify/app-bridge-react';

import CodeInput from '../../../../components/control/codeInput.js'
import TitleInput from '../../../../components/control/titleInput.js'
import ImageInput from '../../../../components/control/imageInput.js'
import DescriptionInput from '../../../../components/control/descriptionInput'

const equalIngoreNull = (obj1, obj2) => {
    console.log("obj1", obj1)
    console.log("obj2", obj2)

    if (obj1 && obj2) {
        console.log("obj2", obj1 == obj2)

        return obj1 == obj2;
    }
    console.log("equalIngoreNull", true)

    if (obj1 && obj1 == "") {
        return true;
    }
    if (obj2 && obj2 == "") {
        return true;
    }
    return true;
}

const EditForm = (props) => {


    {/*  Contorl Infomation Block */ }
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState(0);

    {/*  Business Information Block */ }
    const [rawObj, setRawObj] = useState(props.account ? props.account : {});
    const [editObj, setEditObj] = useState(props.account ? props.account : {});
    const [validObj, setValidObj] = useState({});

    useEffect(() => {
        console.log("useEffect step", step)
        if (step == 0) {

            let account = {
                name: "",
                title: ""
            }

            if (props.account) {
                account = props.account;
            }

            setRawObj({ ...account });
            setEditObj(account);
            return;
        }

        console.log("editObj", editObj)

        var _dirty = false;
        for (var key in editObj) {
            if (!(rawObj[key] === editObj[key])) {
                _dirty = true;
            }
        }

        var _valid = true;
        for (var key in validObj) {
            if (validObj[key] == false) {
                _valid = false;
            }
        }

        console.log("_dirty", _dirty)
        console.log("_valid", _valid)

        if (_dirty == true && _valid == true) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

    }, [step]);


    const handleChange = useCallback((name, value, valid) => {
        console.log("handleChange step", step)
        console.log("name=" + name + "   value=" + value + "   valid=" + valid);
        editObj[name] = value;
        validObj[name] = valid;
        setEditObj(editObj);
        setValidObj(validObj);
        setStep(step + 1);
    }, [step]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log("onSubmit", editObj)
        props.onSubmit(editObj);
    }, [editObj]);


    return (
        <Form>
            <FormLayout>
                <CodeInput
                    label="コード"
                    name="name"
                    text={editObj.name}
                    required={true}
                    setChange={handleChange}>
                </CodeInput>
                <CodeInput
                    label="種別名"
                    name="title"
                    text={editObj.title}
                    required={true}
                    setChange={handleChange}>
                </CodeInput>
                <Button primary
                    disabled={disabled}
                    onClick={handleSubmit}>
                    登録
                </Button>
            </FormLayout>
        </Form>
    );
}

export default EditForm;



