import { useRef, useState } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";

const FACEBOOK_LOGIN_URL = "https://www.facebook.com/login";
const SAVED_VIDEOS_URL = "https://mbasic.facebook.com/saved";

// Detects login via the (non-HttpOnly) c_user cookie marker.
const CHECK_LOGIN_JS = `
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "login-check", loggedIn: document.cookie.includes("c_user") })
  );
  true;
`;

// HttpOnly session cookies (xs, fr, ...) are invisible to document.cookie,
// but the WebView's network layer still attaches them to this page's own
// requests, so we read the rendered HTML from inside the page itself.
const EXTRACT_HTML_JS = `
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "html", html: document.documentElement.outerHTML })
  );
  true;
`;

export default function index() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [html, setHtml] = useState<string | null>(null);
  const webViewRef = useRef<WebView>(null);

  if (html) {
    return (
      <View>
        <Text>Saved page HTML length: {html.length}</Text>
      </View>
    );
  }

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: loggedIn ? SAVED_VIDEOS_URL : FACEBOOK_LOGIN_URL }}
      sharedCookiesEnabled
      injectedJavaScript={loggedIn ? EXTRACT_HTML_JS : CHECK_LOGIN_JS}
      onMessage={(event) => {
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === "login-check" && message.loggedIn) {
          setLoggedIn(true);
        } else if (message.type === "html") {
          setHtml(message.html);
        }
      }}
      onNavigationStateChange={() => {
        webViewRef.current?.injectJavaScript(
          loggedIn ? EXTRACT_HTML_JS : CHECK_LOGIN_JS,
        );
      }}
    />
  );
}
