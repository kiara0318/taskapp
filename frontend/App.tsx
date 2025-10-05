import React from "react";
import { Button, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

const BACKEND_URL = "https://taskapp-15u7.onrender.com";

export default function App() {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  const login = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
        `${BACKEND_URL}/login`,
        "taskapp://redirect"
    );

    console.log("Auth result:", result);

    if (result.type === "success" && result.url) {
      const parsed = Linking.parse(result.url);
      const token = parsed.queryParams?.access_token;
      if (token) {
        setAccessToken(token);
        console.log("Access token:", token);
      }
    }
  };

  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {accessToken ? (
            <Text>Logged in! Token: {accessToken}</Text>
        ) : (
            <Button title="Login with Spotify" onPress={login} />
        )}
      </View>
  );
}
