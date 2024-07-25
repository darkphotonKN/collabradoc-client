"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [client, setClientList] = useState([]);
  const [name, setName] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5050/ws");

    socket.onopen = () => {
      console.log("Connected to web socket server!");
      // Send a message to the server
      const message = {
        action: "greet",
        value: "Hello, server!",
      };

      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      const { data: json } = event;
      const message = JSON.parse(json);
      console.log("Message:", message);

      // use type to determine how to handle the data
      // TODO: update to custom binary communication protocol
      switch (message.message_type) {
        case "client_list": {
          setClientList(message.value);
          break;
        }
        default: {
          break;
        }
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from Websocket Server.");
    };

    // set websocket to state for persistent usage
    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  function handleJoinEditor() {
    console.log("joining editor");
    console.log("client list length:", client.length);

    ws?.send(
      JSON.stringify({
        action: "join_game",
        value: name,
      }),
    );
  }

  function handleInpChange(e: any) {
    setName(e.target.value);
  }

  console.log("clientList:", client);
  return (
    <div>
      <div className="py-[20px] px-[80px] bg-gray-400">
        {/* Client List */}
        <div className="bg-white rounded w-[300px] flex flex-col p-3">
          <h3>Editors</h3>

          {client.map((player) => (
            <div>{player}</div>
          ))}

          <div className="mt-4 flex flex-col">
            <input
              style={{ width: "200px" }}
              onChange={handleInpChange}
              value={name}
            />
            <button
              style={{
                marginTop: "40px",
                width: "200px",
                borderRadius: "4px",
                border: "1px solid #1a1a1a",
              }}
              onClick={handleJoinEditor}
            >
              Join Editor
            </button>
          </div>
        </div>
        <div className="mt-4 rounded bg-white w-full min-h-screen"></div>
      </div>
    </div>
  );
};

export default Home;
