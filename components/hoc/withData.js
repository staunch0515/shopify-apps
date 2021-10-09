import React from 'react'

export default (ComposedComponent, options = {}) => {
    return class WithData extends React.Component {
        static displayName = `WithData(${ComposedComponent.displayName})`

        static async getInitialProps(ctx) {
            // Evaluate the composed component's getInitialProps()
            let composedInitialProps = {}
            if (ComposedComponent.getInitialProps) {
                composedInitialProps = await ComposedComponent.getInitialProps(ctx)
            }

            return {
                ...composedInitialProps,
            }
        }

        constructor(props) {
            super(props)
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
}
