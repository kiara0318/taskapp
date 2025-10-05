import React from "react";
import { Button, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const backendUrl = "https://taskapp-15u7.onrender.com";

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);

  const login = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
        `${backendUrl}/login`,
        "taskapp://redirect"
    );
    console.log(result);
  };

  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {token ? (
            <Text>Welcome! Token: {token}</Text>
        ) : (
            <Button title="Login with Spotify" onPress={login} />
        )}
      </View>
  );
}
