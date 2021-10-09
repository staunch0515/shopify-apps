import { SkeletonPage, Layout, Card, SkeletonDisplayText, SkeletonBodyText, TextContainer } from '@shopify/polaris';

export default () => (
    <SkeletonPage
        primaryAction
        secondaryActions={2}>
        <Layout>
            <Layout.Section>
                <Card sectioned>
                    <SkeletonBodyText />
                </Card>
                <Card sectioned>
                    <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText />
                    </TextContainer>
                </Card>
            </Layout.Section>
        </Layout>
    </SkeletonPage>
);