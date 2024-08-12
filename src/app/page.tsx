"use client";

import Editor from "@/components/Editor";
import EditorList from "@/components/EditorList";
import { User } from "@/constants/doc";
import { ActionType, ActionTypeEnum } from "@/constants/enums";
import { useEffect, useState } from "react";

const Home = () => {
  const LIST_DELIMITER = ","; // value used to join lists from binary encoding

  const [client, setClientList] = useState([]);
  const [name, setName] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState<string[] | null>(null);

  // system message
  const [systemMsg, setSystemMsg] = useState("");
  const [systemMsgPopup, setSystemMsgPopup] = useState(false);

  // fade out system message
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

  // Handling Websocket
  useEffect(() => {
    // get token from local storage
    const accessToken = localStorage.getItem("access");
    console.log("access token:", accessToken);

    const socket = new WebSocket(`ws://localhost:5050/ws?token=${accessToken}`);

    socket.onopen = () => {
      console.log("Connected to web socket server!");
      ws?.send(
        JSON.stringify({
          action: "join_doc",
          value: name,
        }),
      );
    };

    socket.onerror = (error) => {
      console.log("Websocket error:", error);
    };

    socket.onmessage = (event) => {
      // check data is blob
      if (event.data instanceof Blob) {
        const reader = new FileReader();

        reader.onload = function() {
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

              // testing
              // console.log("action:", action);
              // console.log("valueLength", valueLength);
              // console.log("value:", value);

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

              console.log("editor list value:", value);

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

  function handleInpChange(e: any) {
    setName(e.target.value);
  }

  console.log("clientList:", client);
  console.log("systemMsgPopup", systemMsgPopup);

  return (
    <div>
      <EditorList users={users} />

      {/* System Message */}
      <div
        className={`absolute top-[95vh] left-1/2 transform -translate-x-1/2 rounded-md border border-gray-900 p-2 transition ease-in duration-350 ${systemMsgPopup ? "opacity-100 -translate-y-[15px]" : "opacity-0"}`}
      >
        {systemMsg}
      </div>
      <div className="py-[20px] px-[80px] bg-gray-400">
        <Editor ws={ws} />
      </div>
    </div>
  );
};

export default Home;
