import { Instance } from "simple-peer";
import { ClientMessageType, IControlMessage, ISeekMessage } from "../Messages/ControlMessage";

class ClientMessenger {
    private peer: Instance;

    constructor(peer: Instance) {
        this.peer = peer;
    }

    public sendPlayPauseMessage() {
        const message: IControlMessage = {
            type: ClientMessageType.PLAY_PAUSE,
        };
        this.sendMessage(message);
    }

    public sendSeekMessage(time) {
        const message: ISeekMessage = {
            type: ClientMessageType.SEEK,
            time,
        };
        this.sendMessage(message);
    }

    private sendMessage(message: Object) {
        this.peer.send(JSON.stringify(message));
    }
}

export default ClientMessenger;
