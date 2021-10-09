import React from 'react';
import {
    Modal,
    Toast
} from '@shopify/app-bridge-react';


import ConfimModal from '../control/confimModal'

const MainContext = React.createContext({
    redirectPage: (url) => { },
})

export class MainProvider extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        toast: {
            show: false,
            message: "",
            error: false,
        },
        modal: {
            title: "test",
            show: false,
            message: "test11",
            size: "Large",
            src: "",
            callback: null,
        },
        confirm: {
            open: false,
            title: "",
            content: "",
            callback: null,
            data: null,
        }
    }

    showToast = (message) => {
        this.setState({
            toast: {
                show: true,
                message: message,
                error: false,
            },
        });
    }

    showError = (message) => {
        this.setState({
            toast: {
                show: true,
                message: message,
                error: true,
            },
        });
    }

    dismissToast = () => {
        this.setState({
            toast: {
                show: false,
                message: "",
                error: false,
            },
        });
    };

    openPage = (title, src, size = "Large") => {
        this.setState({
            modal: {
                title: title,
                show: true,
                message: "",
                size: size,
                src: src,
            }
        });
    };

    openDialog = (title, src, size = "Medium") => {
        this.setState({
            modal: {
                title: title,
                show: true,
                message: "",
                size: size,
                src: src,
            }
        });
    };

    showMessage = (title, message, callback) => {
        console.log("showMessage      " + message);
        this.setState({
            modal: {
                title: title,
                show: true,
                message: message,
                size: "Small",
                scr: "",
                callback: (confirmed) => {
                    this.setState({
                        modal: {
                            message: "test",
                            show: false,
                        }
                    });
                    if (confirmed && callback) {
                        callback();
                    }
                },
            }
        });
    };

    confirmAction = (action, message, callback) => {
        console.log("showMessage      " + message);
        this.setState({
            modal: {
                title: "確認",
                show: true,
                message: message,
                size: "Small",
                action: action,
                important: true,
                scr: "",
                callback: (confirmed) => {
                    this.setState({
                        modal: {
                            message: "test",
                            show: false,
                        }
                    });
                    if (confirmed && callback) {
                        callback();
                    }
                },
            }
        });
    };
    openConfirmModal = (title, content, callback) => {
        this.setState({
            confirm: {
                open: true,
                title: title,
                content: content,
                callback: callback,
            }
        });
    };

    closeConfirmModal = () => {
        this.setState({
            confirm: {
                open: false,
                content: "",
                callback: null,
                data: null,
            }
        });
    };

    render() {
        return (
            <MainContext.Provider
                value={{
                    showToast: this.showToast,
                    showError: this.showError,
                    openPage: this.openPage,
                    openDialog: this.openDialog,
                    openConfirmModal: this.openConfirmModal,
                    closeConfirmModal: this.closeConfirmModal,
                    showMessage: this.props.showMessage,
                    confirmAction: this.props.confirmAction,
                    redirectUrl: this.props.handleRedirectUrl,
                    redirectPage: this.props.handleRedirectPage,
                }}
            >
                {this.props.children}
                {this.state.toast.show ? (
                    <Toast
                        content={this.state.toast.message}
                        onDismiss={this.dismissToast}
                        error={this.state.toast.error}
                        duration={3000} />
                ) : null}
                <ConfimModal
                    open={this.state.confirm.open}
                    title={this.state.confirm.title}
                    content={this.state.confirm.content}
                    callback={this.state.confirm.callback}
                    closeConfirmModal={this.closeConfirmModal}
                >
                </ConfimModal>
            </MainContext.Provider>
        );
    }
}

export const MainConsumer = MainContext.Consumer

export default MainContext;