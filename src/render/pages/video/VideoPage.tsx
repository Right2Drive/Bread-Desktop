import * as React from "react";
import * as SimplePeer from "simple-peer";
import * as SocketIO from "socket.io-client";

import * as Exception from "../../../common/Exceptions";
import { watchServerStatusAction } from "../../Actions/CommonPeerActions";
import { setVideoReadyAction, setPlayStatusAction } from "../../Actions/VideoActions";
import { EaseVideoElement } from "../../components/EaseVideoElement";

export interface IOfferMessage {
    hostID: string;
    clientID: string;
    signalData: SimplePeer.SignalData;
}

export interface IResponseMessage {
    clientID: string;
    signalData: SimplePeer.SignalData;
}

export interface IVideoInputProps {
    videoSource: string;
    poster: string;
}

export interface IVideoStoreProps {
    readonly id: string;
    readonly signalHost: string;
    readonly videoReady: boolean;
    readonly serverStatus: boolean;
}

export interface IVideoDispatchProps {
    readonly watchServerStatusDispatch: watchServerStatusAction;
    readonly setVideoReadyDispatch: setVideoReadyAction;
    readonly setPlayStatusDispatch: setPlayStatusAction;
}

export interface IVideoState {
    time: number;
}

export type IVideoProps = IVideoInputProps & IVideoStoreProps & IVideoDispatchProps;

export abstract class VideoPage<P extends IVideoProps> extends React.Component<P, IVideoState> {
    protected socket: SocketIOClient.Socket;
    protected max: number;

    private videoElement: HTMLVideoElement;

    constructor(props) {
        super(props);

        this.state = {
            time: 0,
        };

        this.socket = SocketIO.connect(this.props.signalHost);
        this.props.watchServerStatusDispatch(this.socket);
    }

    /************************ Methods ************************/

    public getVideo = (): HTMLVideoElement => {
        return this.videoElement;
    }

    protected setTime = (time: number) => {
        this.setState({
            time,
        });
    }

    private setVideo = (video: HTMLVideoElement) => {
        this.videoElement = video;
    }

    /******************** Abstract Methods *******************/

    protected abstract onPlayPauseButton: () => void;
    protected abstract onVolumeButton: () => void;
    protected abstract onCastButton: () => void;
    protected abstract onFullscreenButton: () => void;
    protected abstract onSeek: (time: number) => void;
    protected abstract onVolumeChange: (volume: number) => void;

    /********************* React Lifecycle *******************/

    protected componentDidMount() {
        console.log("video mounted");
    }

    public render(): JSX.Element {
        return (
            <div className="video">
                <b> ID: </b> {this.props.id}
                <EaseVideoElement
                    poster={this.props.poster}
                    videoSource={this.props.videoSource}
                    setVideo={this.setVideo}
                    onPlayPauseButton={this.onPlayPauseButton}
                    onVolumeButton={this.onVolumeButton}
                    onCastButton={this.onCastButton}
                    onFullscreenButton={this.onFullscreenButton}
                    onSeek={this.onSeek}
                    onVolumeChange={this.onVolumeChange}
                    max={this.max}
                    time={this.state.time}
                />
            </div>
        );
    }
}
