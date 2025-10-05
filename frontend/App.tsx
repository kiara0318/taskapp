import React from "react";
import { Button, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const backendUrl = "https://taskapp-15u7.onrender.com";

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);

  const login = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
        `${backendUrl}/login`,
        "taskapp://redirect"
    );

    if (result.url) {
      // Parse token from URL
      const urlParams = new URLSearchParams(result.url.split("?")[1]);
      setToken(urlParams.get("access_token"));
    }
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
