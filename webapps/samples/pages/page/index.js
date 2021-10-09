import { Page, Badge, Thumbnail, Avatar } from '@shopify/polaris';

const SamplePage = (props) => {
    return (
        <Page 
            breadcrumbs={[{ content: 'Products', url: '/products' }]}
            title="3/4 inch Leather pet collar"
            titleMetadata={<Badge status="success">Paid</Badge>}
            subtitle="Perfect for any pet"
            thumbnail={
                <Thumbnail
                    source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                    alt="Black leather pet collar"
                />
            }
            primaryAction={{ content: 'Save', disabled: true }}
            secondaryActions={[
                {
                    content: 'Duplicate',
                    accessibilityLabel: 'Secondary action label',
                },
                { content: 'View on your store' },
            ]}
            actionGroups={[
                {
                    title: 'Promote',
                    accessibilityLabel: 'Action group label',
                    actions: [
                        {
                            content: 'Share on Facebook',
                            accessibilityLabel: 'Individual action label',
                            onAction: () => { },
                        },
                    ],
                },
            ]}
            pagination={{
                hasPrevious: true,
                hasNext: true,
            }}
            additionalNavigation={<Avatar size="small" initials="CD" customer={false} />}
            separator
        >
            <p>Page content</p>
        </Page>
    );
}

export default SamplePage;