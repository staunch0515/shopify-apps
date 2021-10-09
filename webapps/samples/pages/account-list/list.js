import React, { useContext, useEffect } from 'react';
import {
    useStore,
    useDispatch,
    useSelector
} from 'react-redux'
import {
    Card,
    Icon,
    Button,
    Thumbnail,
    ButtonGroup,
    Tooltip,
    DataTable,
    TextStyle,
    TextContainer
} from '@shopify/polaris';
import {
    ActionTypes,
    fetchData,
    actionSubmit,
} from '../../store/action'
import {
    EditMajorMonotone,
    DeleteMajorMonotone,
    SortDescendingMajorMonotone,
    SortAscendingMajorMonotone,
    AddNoteMajorMonotone
} from '@shopify/polaris-icons';


import MainContext from '../../../../components/context/MainContext';
import { PageList } from '../../common/pagelist';

const Image = ({ custType }) => {
    return (<Thumbnail
        source={
            custType.imgSrc
                ? custType.imgSrc
                : ''
        }
    />);
}

const TableSection = (props) => {
    const { rows } = props;
    return (<DataTable
        columnContentTypes={[
            'text',
            'text',
            'text',
            'text',
            'text',
        ]}
        headings={[
            '顧客種別',
            '画像',
            '説明',
            '備考',
            '',
        ]}
        rows={rows}
    />);
}

function getRows(data, onUp, onDown, onEdit, onDelete) {
    let rows = [];
    if (data == undefined) {
        return rows;
    }
    let i = 1;
    data.map((custType) => {
        console.log(custType);
        rows.push([
            custType.title,
            <Image custType={custType}></Image>,
            <TextContainer>{custType.description}</TextContainer>,
            <TextContainer>{custType.remark}</TextContainer>,
            <ButtonGroup segmented={false}>
                <Button size="slim"
                    onClick={(e) => onUp(e, custType)}
                    disabled={custType.former ? false : true}>
                    <Tooltip content="アップ" preferredPosition="above">
                        <Icon
                            source={SortAscendingMajorMonotone} />
                    </Tooltip>
                </Button>
                <Button size="slim"
                    onClick={(e) => onDown(e, custType)}
                    disabled={custType.next ? false : true}>
                    <Tooltip content="ダウン" preferredPosition="above">
                        <Icon
                            source={SortDescendingMajorMonotone} />
                    </Tooltip>
                </Button>
                <Button size="slim" onClick={(e) => onEdit(e, custType)}>
                    <Tooltip content="編集" preferredPosition="above">
                        <Icon
                            source={EditMajorMonotone} />
                    </Tooltip>
                </Button>

                <Button size="slim" onClick={(e) => onDelete(e, custType)}>
                    <Tooltip content="削除" preferredPosition="above">
                        <Icon
                            source={DeleteMajorMonotone} />
                    </Tooltip>
                </Button>
            </ButtonGroup>
        ]);
        i = i + 1;
    });
    return rows;
}

const ListSection = (props) => {
    const { custTypes, onUp, onDown, onDelete } = props;
    const { redirectPage } = useContext(MainContext);

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        const input = {
            action: '',
        }
        fetchData('', input)(dispatch);
    }, []);

    {/* Set the data before and after the current record, for sorting */ }
    let former;
    if (custTypes != undefined && custTypes.length > 0) {
        custTypes.map((custType) => {
            if (former) {
                custType.former = former.uid;
                former.next = custType.uid;
            }
            former = custType;
        });
    }

    const onNew = (e) => {
        e.preventDefault();
        console.log("onNew", PageList.ACCOUNT_NEW);
        redirectPage(PageList.ACCOUNT_NEW);
    }

    const onEdit = (e, custType) => {
        e.preventDefault();
        redirectPage(PageList.ACCOUNT_NEW, { custType: custType });
    }

    const onUpEvent = (e, record) => {
        e.preventDefault();
        onUp(record);
    }

    const onDownEvent = (e, record) => {
        e.preventDefault();
        onDown(record);
    }

    const onDeleteEvent = (e, record) => {
        e.preventDefault();
        onDelete(record);
    }

    let rows = getRows(custTypes, onUpEvent, onDownEvent, onEdit, onDeleteEvent);

    return (
        <Card sectioned={true}>
            <Card.Header title="アカウントリスト" >
                <Button primary onClick={onNew} >新規</Button>
            </Card.Header>
            <Card.Section >
            </Card.Section>
            {rows.length > 0 ?
                <TableSection
                    {...props}
                    rows={rows}>
                </TableSection> : <p>なし</p>
            }
        </Card>
    )
}

export default ListSection