import React, { useCallback, useState, useEffect } from 'react';
import { TextField, Button, Tooltip, FormLayout, ButtonGroup, DataTable, TextStyle } from '@shopify/polaris';
import {
    EditMajorMonotone,
    DeleteMajorMonotone,
} from '@shopify/polaris-icons';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
var uniqid = require('uniqid');


const DeleteButton = (props) => {
    const { item, onDelete } = props;

    const handleClick = () => {
        if (onDelete) {
            onDelete(item);
        }
    }
    return (
        <Button
            size="slim"
            icon={DeleteMajorMonotone}
            onClick={handleClick} >
            <Tooltip
                content="削除"
                preferredPosition="above">
            </Tooltip>
        </Button>
    );
}

const EditButton = (props) => {
    const { item, onEdit } = props;

    const handleClick = () => {
        if (onEdit) {
            onEdit(item);
        }
    }
    return (
        <Button
            size="slim"
            icon={EditMajorMonotone}
            disabled={props.disabled}
            onClick={handleClick} >
            <Tooltip
                content="編集"
                preferredPosition="above">
            </Tooltip>
        </Button>
    );
}

export default function DataList({ value, setValue }) {

    const [key, setKey] = useState(null);
    const [text, setText] = useState(null);

    const handleChange = useCallback((newValue) => setText(newValue), []);

    const [target, setTarget] = useState(value ? JSON.parse(value) : {});

    const [list, setList] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let li = [];
        for (var _key in target) {
            li.push(target[_key]);
        }
        setList(li);
    }, [target]);

    const handleEdit = useCallback((newValue) => {
        setKey(newValue.value);
        setText(newValue.label);
    }, []);

    const handleDelete = useCallback((curItem) => {
        console.log("handleDelete", list)
        let li = [];
        list.map(item => {
            if (item.value != curItem.value) {
                li.push(item);
            }
        });
        setList(li);
    }, [list]);

    useEffect(() => {
        console.log("handleClick", list)
        let rows = [];
        let i = 1;
        list.map(item => {
            rows.push([
                `#${i}`,
                item.label,
                <ButtonGroup>
                    <EditButton
                        onEdit={handleEdit}
                        item={item}
                        disabled={key == item.value ? true : false} >編集</EditButton>
                    <DeleteButton
                        onDelete={handleDelete}
                        item={item}>削除</DeleteButton>
                </ButtonGroup>,
            ]);
            i++;
        });
        setRows(rows);
    }, [list.length, key]);

    const handleClick = () => {
        console.log("handleClick", list)
        let li = [];
        if (key) {
            list.map(item => {
                if (item.value == key) {
                    li.push({ label: text, value: key });
                } else {
                    li.push(item);
                }
            });
        } else {
            li = list;
            li.push({ label: text, value: uniqid.process() });
        }
        setKey(null);
        setText(null);
        if (setValue) {
            let result = {};
            li.map((item, index) => {
                result[index] = item;
            });
            setValue(JSON.stringify(result));
        }
        setList(li);
    }


    return (
        <Container>
            <Row>
                <Col>
                    <TextStyle>オプションリスト</TextStyle>
                </Col>
            </Row>
            <Row>
                <Col>
                    <table>
                        <tr>
                            <td>
                                <TextStyle>項目</TextStyle>
                            </td>
                            <td>
                                <TextField value={text} onChange={handleChange} />
                            </td>
                            <td>
                                <Button onClick={handleClick}>保存</Button>
                            </td>
                        </tr>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col>
                    {rows && rows.length > 0 ?
                        <DataTable
                            columnContentTypes={[
                                'numeric',
                                'text',
                                'text',
                            ]}
                            headings={[
                                '順序',
                                '内容',
                                '作動',
                            ]}
                            rows={rows}
                        /> : null}
                </Col>
            </Row>
        </Container>
    );
}