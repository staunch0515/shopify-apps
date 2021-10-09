import { Layout, Page, Card, TextStyle } from '@shopify/polaris';

export default ({ title }) => {
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Card title={title} sectioned>
                        <Card.Section>
                            <TextStyle>内容なし、後で追加います。</TextStyle>
                        </Card.Section>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}