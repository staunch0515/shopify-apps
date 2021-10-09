import { Page, Layout, Card, TextStyle } from '@shopify/polaris';
import dynamic from "next/dynamic";
const Window = dynamic(import('../webapps/' + APP_NAME + '/common/window.js'));

class Error extends React.Component {
    render() {
        console.log("error", this.props)
        return <Window {...this.props}></Window>
    }
}

export default Error;