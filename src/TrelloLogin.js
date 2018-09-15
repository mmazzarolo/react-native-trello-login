/**
 * The login screen uses a Webview to show a static HTML page that authorizes
 * the user using a Trello OAuth redirection.
 * The flow is the following:
 * - The webview loads the static HTML page
 * - Once the page loads, it sends a "WEBVIEW_LOADED" message to React Native
 * - React Native, after receiving "WEBVIEW_LOADED", sends an "AUTHORIZE"
 *   message with the Trello API key to the webview
 * - Then, the webview starts the Trello authentication flow and when it's
 *   completed it sends an "AUTH_SUCCES" message to React Native with the Trello
 *   authentication token. If the Trello authentication process fails,
 *   an "AUTH_FAILURE" message is sent instead.
 */
import * as React from "react";
import { WebView, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import trelloLoginWebsiteHtml from "./trelloLoginWebsite.html";

class TrelloLogin extends React.Component {
  static propTypes = {
    applicationName: PropTypes.string.isRequired,
    debugEnabled: PropTypes.bool,
    onLoginFailure: PropTypes.func.isRequired,
    onLoginSuccess: PropTypes.func.isRequired,
    style: PropTypes.any,
    trelloApiKey: PropTypes.string.isRequired
  };

  webViewRef;

  log = (message, optionalParams) => {
    if (this.props.debugEnabled) {
      console.debug(message, optionalParams);
    }
  };

  handleWebViewMessage = e => {
    const {
      applicationName,
      onLoginFailure,
      onLoginSuccess,
      trelloApiKey
    } = this.props;
    let data;
    try {
      data = JSON.parse(e.nativeEvent.data);
      this.log("Received webview message with type: ", data.type);
    } catch (err) {
      this.log("Unable to parse webview message: ", e.nativeEvent.data);
      onLoginFailure("Unable to parse webview message");
    }

    if (data.type === "WEBVIEW_LOADED") {
      if (this.webViewRef) {
        const message = {
          type: "AUTHORIZE",
          trelloApiKey: trelloApiKey,
          applicationName: applicationName
        };
        this.webViewRef.postMessage(JSON.stringify(message));
      }
    } else if (data.type === "AUTH_SUCCESS") {
      onLoginSuccess(data.authToken);
    } else if (data.type === "AUTH_FAILURE") {
      this.log("Authentication failed");
      onLoginFailure("Authentication failed");
    } else {
      this.log("Invalid webview message type: ", data.type);
      onLoginFailure("Invalid webview message type");
    }
  };

  render() {
    const {
      applicationName,
      debugEnabled,
      onLoginFailure,
      onLoginSuccess,
      style,
      trelloApiKey,
      ...otherProps
    } = this.props;
    return (
      <WebView
        style={[styles.webView, style]}
        ref={ref => (this.webViewRef = ref)}
        source={trelloLoginWebsiteHtml}
        onMessage={this.handleWebViewMessage}
        javaScriptEnabled
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 1
  }
});

export default TrelloLogin;
