import React from "react";
import { Button, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

const backendUrl = "https://taskapp-15u7.onrender.com";

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);

  const login = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
        `${backendUrl}/login`,
        "taskapp://redirect"
    );

    console.log("result", result);

    if (result.type === "success" && result.url) {
      // Parse token from URL
      const parsed = Linking.parse(result.url);
      const accessToken = parsed.queryParams?.token; // <- must match backend
      if (accessToken) setToken(accessToken);
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
