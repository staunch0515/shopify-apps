import React, { useContext } from 'react';
import {
    Card,
    Thumbnail,
    Button,
    Tooltip,
    Icon,
    DataTable,
    ButtonGroup,
    TextStyle,
} from '@shopify/polaris';
import {
    PageDownMajorMonotone,
    TextBlockMajorMonotone,
} from '@shopify/polaris-icons';

import MainContext from '../../../../components/context/MainContext';
import { PageList } from '../../common/pagelist';

const Image = ({ item }) => {
    return (<Thumbnail
        source={
            item.imageSrc
                ? item.imageSrc
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
            'text',
            'text',
            'text',
        ]}
        headings={[
            'ID',
            'フォーム',
            '名前',
            'メールアドレス',
            '回答日時',
            'ステータス',
            '終了',
            '詳細',
        ]}
        rows={rows}
    />);
}

const EditButton = (props) => {
    const { item } = props;
    const { redirectPage } = useContext(MainContext);

    const handleClick = () => {
        redirectPage(PageList.ANS_DETAIL, { frmAns: item });
    }
    return (
        <Button
            icon={TextBlockMajorMonotone}
            onClick={handleClick} >
            <Tooltip
                content="詳細画面に入る"
                preferredPosition="above">
            </Tooltip>
        </Button>
    );
}

function getRows(data) {
    let rows = [];
    if (data == undefined) {
        return rows;
    }
    let i = 1;
    data.map((item) => {
        rows.push([
            `#${item.frmDef ? item.frmDef.orderNo : ""}`,
            item.frmDef ? item.frmDef.title : "",
            item.fullName,
            item.email,
            item.createdAt,
            item.status ? item.status.title : "",
            item.status ? item.status.hasFinish ? "終了" : "未終了" : null,
            <ButtonGroup>
                <EditButton item={item}></EditButton>
            </ButtonGroup>,
        ]);
        i = i + 1;
    });
    return rows;
}

const AnsListSection = (props) => {

    const { showToast } = useContext(MainContext);
    const { result } = props;

    const rows = getRows(result.rows, this.onEdit);

    const [loading, setLoading] = useState(false);
    const [queryInput, setQueryInput] = useState({});
    const [count, setCount] = useState(false);

    return (

        <Card.Section>
            {this.state.rows.length > 0 ?
                <TableSection rows={rows}></TableSection>
                : <TextStyle>適格なデータはありません</TextStyle>
            }
        </Card.Section>

    );
}


export default AnsListSection;