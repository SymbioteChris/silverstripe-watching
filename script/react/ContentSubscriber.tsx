import * as React from 'react';

interface Props {
    itemClass: string,
    itemID: string,
    type?: string
}

interface State {
    updatingState: boolean
    watchDetails?: any
}


export class ContentSubscriber extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            updatingState: true
        }

        this.loadData();
    }

    propsToReq = (props: Props): string => {
        let params: any = {
            itemClass: this.props.itemClass,
            itemID: this.props.itemID
        }

        if (this.props.type) {
            params.type = this.props.type;
        }

        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }

    propsToUrl = (props: Props): string => {
        let params: any = {
            itemClass: this.props.itemClass,
            itemID: this.props.itemID
        }

        if (this.props.type) {
            params.type = this.props.type;
        }

        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '/' + encodeURIComponent(params[k]))
            .join('/');
    }

    loadData = (): void => {
        fetch('api/v1/watch/list?' + this.propsToReq(this.props), {
            credentials: 'same-origin'
        })
            .then((response: Response) => response.json())
            .then((responseObj) => {
                if (responseObj.message === "success") {
                    let details = responseObj.payload.length > 0 ? responseObj.payload[0] : null;
                    this.setState({
                        updatingState: false,
                        watchDetails: details
                    })
                }
            })
    }

    stopWatching = (): void => {
        this.setState({
            updatingState: true
        });

        const url = 'api/v1/watch/unsubscribe/' + this.propsToUrl(this.props);
        fetch(url, {
            method: "POST",
            credentials: 'same-origin'
        })
            .then((response: Response) => response.json())
            .then((jsonData) => {
                this.setState({
                    updatingState: false,
                    watchDetails: null
                })
            })
    }

    startWatching = (): void => {
        this.setState({
            updatingState: true
        });

        let url = 'api/v1/watch/subscribe/' + this.propsToUrl(this.props);

        fetch(url, {
            method: "POST",
            credentials: 'same-origin'
        })
            .then((response: Response) => response.json())
            .then((jsonData) => {
                if (jsonData.message === "success") {
                    this.setState({
                        updatingState: false,
                        watchDetails: jsonData.payload
                    })
                }
            })
    }

    toggleStatus = (): void => {
        if (this.state.watchDetails) {
            this.stopWatching()
        } else {
            this.startWatching();
        }
    }

    render(): JSX.Element | null {
        const { updatingState, watchDetails } = this.state;

        const { itemClass, itemID } = this.props;

        if (!itemClass || !itemID) {
            return null;
        }

        if (updatingState) {
            return (
                <div className="ContentSubscriber">
                    <img src="resources/silverstripe/cms/client/dist/images/loading.gif" alt="Please wait..." />
                </div>
            );
        }

        return (
            <div className="ContentSubscriber">
                <button onClick={this.toggleStatus} className={"ContentSubscriber__ToggleButton " + (watchDetails ? "IsWatching" : "")}>
                    <span className="ContentSubscriber__Text">{watchDetails ? "Unsubscribe" : "Watch this page"}</span>
                </button>
            </div>
        )
    }
}

