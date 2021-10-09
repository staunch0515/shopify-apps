{/*   */ }
import { Card, TextContainer, Heading } from '@shopify/polaris'


const Help = () => (
    <Card sectioned title="説明">
        <Card.Section>
            <TextContainer>
                <Heading element="h1"> 支払失敗の場合(クレジットカード)</Heading>
                <p>
                    ①の✓を入れたら必須
  </p>
            </TextContainer>
            <TextContainer>
                <Heading element="h1"> 猶予期間の設定(クレジットカード)</Heading>
                <p>
                    ②で2：猶予期間を経て再処理を選択したら必須
  </p>
            </TextContainer>
        </Card.Section >
    </Card>
);


export default Help;