import { Button, StyleSheet, Text, View } from "react-native";
// import { socket } from './socket';
import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import msgpackParser from "socket.io-msgpack-parser";

// export const socket = io("http://10.0.2.2:3005/public"); 
// 
const socket = io("http://10.0.2.2:3005/public", { transports: ["websocket"], parser:msgpackParser });
// socket.on("connect", () => console.log("Connected:", socket.id));
// socket.on("connect_error", (err) => console.error("Connection Error:", err.message));//	use the IP address of your machine

export default function Dummy() {
  const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState("N/A");
  // console.log('socket', socket)
  
  function abc() {

    socket.connect();

    // socket.on("connect", () => {
    //   console.log("Connected:", socket.id);
    //   setIsConnected(true);
    //   setIsConnected(true);
    // });
  }

  function ddd() {
    socket.close();
  }
  useEffect(() => {
    if (!socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      // setTransport(socket.io.engine.transport.name);

      // socket.io.engine.on("upgrade", (transport) => {
      //   setTransport(transport.name);
      // });
    }

    function onDisconnect() {
      setIsConnected(false);
      // setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
    socket.on("disconnect", onDisconnect);

    //🟢 Debugging for incoming/outgoing events (only in development)
    if (__DEV__) {
      socket.onAnyOutgoing((event, ...args) => {
        console.log(`Outgoing event [${event}] --->`, args[0]);
      });
      socket.onAny((event, ...args) => {
        console.log(`Incoming event [${event}] --->`, args[0]);
      });
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  return (
    <View style={styles.container}>
      <Text>Status: {socket?.connected ? "connected" : "disconnected"}</Text>
      <Text>isConnected: {isConnected}</Text>
      <Button title="restart" onPress={() => abc()}></Button>
      <Button title="close" onPress={()=>ddd()}></Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
