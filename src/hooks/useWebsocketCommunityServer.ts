import { LIST_DELIMITER } from "@/constants/comm-protocol";
import { ActionType, ActionTypeEnum } from "@/constants/enums";
import { getToken } from "@/lib/auth/jwt";
import { authorizeLiveSession, isCommunityDoc } from "@/lib/auth/live-session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type WebsocketServerSetupOptions = {
  documentId?: string;
};

export default function useWebsocketCommunityServer(
  wsServerSetupOptions?: WebsocketServerSetupOptions,
) {
  const router = useRouter();

  const [users, setUsers] = useState<string[] | null>(null);

  const [systemMsg, setSystemMsg] = useState("");
  const [systemMsgPopup, setSystemMsgPopup] = useState(false);

  const [ws, setWs] = useState<WebSocket | null>(null);

  const [communitySessionAuthorized, setCommunitySessionAuthorized] =
    useState<boolean>(false);

  // -- Setup WebSocket --
  useEffect(() => {
    const accessToken = getToken("access");
    console.log("access token:", accessToken);

    // connect to websocket server with jwt authentication
    const socket = new WebSocket(
      `ws://localhost:5050/ws/public?documentId=${wsServerSetupOptions?.documentId}`,
    );

    socket.onopen = () => {
      console.log("Connected to web socket server!");
    };

    socket.onerror = (error) => {
      console.log("Websocket error:", error);
    };

    socket.onmessage = (event) => {
      // check data is blob
      if (event.data instanceof Blob) {
        const reader = new FileReader();

        reader.onload = function () {
          console.log("reader result:", reader.result);
          const buffer = reader.result as ArrayBuffer;

          const dataView = new DataView(buffer);
          console.log("incoming buffer from new DataView:", dataView);

          const action = dataView.getUint8(0) as ActionTypeEnum;

          // decode method is based on action type

          console.log("decoded action from binary:", action);

          const decoder = new TextDecoder();

          switch (action) {
            case ActionType.JOIN: {
              const valueLength = dataView.getUint8(1);

              // grabs the buffer's value from index 2 to the length of the value string
              const value = decoder.decode(
                new Uint8Array(buffer, 2, valueLength),
              );

              setSystemMsgPopup(true);
              setSystemMsg(`${value} has joined the document.`);

              break;
            }

            case ActionType.EDITOR_LIST: {
              // in this case length of value could be longer so the value length
              // is represented across the next 4 bytes (32 bits)
              const valueLength = dataView.getUint32(1);

              // decode user list out of the binary based on the dynamic length value
              const value = decoder.decode(
                new Uint8Array(buffer, 5, valueLength),
              );

              const receivedUserList = value.split(LIST_DELIMITER);

              // tracks list of live ws editor users in state
              setUsers(receivedUserList);
            }

            default: {
              break;
            }
          }
        };

        // read the file as Array Buffer
        reader.readAsArrayBuffer(event.data);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from Websocket Server.");
      ws?.send(
        JSON.stringify({
          action: "disconnected",
          value: "",
        }),
      );
    };

    // set websocket to state for persistent usage
    setWs(socket);

    return () => {
      socket.close(
        1000,
        JSON.stringify({
          action: "disconnected",
          value: "",
        }),
      );
    };
  }, []);

  // -- Handle Live Session Authorization --
  useEffect(() => {
    // handle authorization only if websocket server has setup and authorized
    // and sessionId and documentId has both been provided
    if (ws) {
      validateIsCommunityDoc();
    }
  }, [ws]);

  // establish live session state
  async function validateIsCommunityDoc() {
    const { documentId } = wsServerSetupOptions ?? {};

    if (!documentId) return;

    const communitySessionAuthorized = await isCommunityDoc(documentId);

    console.log("community session authorized:", communitySessionAuthorized);

    setCommunitySessionAuthorized(communitySessionAuthorized);
  }

  // -- System Message Handling --
  useEffect(() => {
    if (systemMsg) {
      setTimeout(() => {
        setSystemMsgPopup(false);
      }, 2000);
    }

    // slightly delay the message disappearing time to allow for transition
    setTimeout(() => {
      setSystemMsg("");
    }, 2200);
  }, [systemMsg]);

  return { ws, communitySessionAuthorized, users, systemMsg, systemMsgPopup };
}
