# react-native-trello-login

[![npm version](https://badge.fury.io/js/react-native-trello-login.svg)](https://badge.fury.io/js/react-native-trello-login)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A component that encapsulates Trello's API token-based authentication to grant third-party applications access to the Trello API.

<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-trello-login/master/.github/login-screenshot-iphonex.png" height="700" />
</p>

## Setup

This library is available on npm, install it with: `npm install --save react-native-trello-login` or `yarn add react-native-trello-login`.

## Usage

### 1. Import `react-native-trello-login`

```javascript
import TrelloLogin from "react-native-trello-login";
```

### 2. Define your Trello API key

To begin the authentication process, you need an API key. Every Trello user is given an API key.
You can retrieve your API key by logging into Trello and visiting [https://trello.com/app-key/](https://trello.com/app-key/).  
Because the API key is tied to the user, it is often a good idea to create a Trello user specifically for building a single application or integration. This ensures that a third-party's integration is disassociated from a third-party integration's developer's Trello account.
It's also suggested to define the API key in a separate file or [in an environment variable](https://github.com/zetachang/react-native-dotenv).

```javascript
const TRELLO_API_KEY = "YOUR_API_KEY_HERE";
```

### 3. Show the Trello authentication screen

The imported `TrelloLogin` component is just a React-Native WebView that will take care of showing and handling the Trello auth process.

```javascript
export default class TrelloLoginExample extends React.Component {
  handleLoginSuccess = trelloAuthToken => {
    // The user authenticated successfully.
    // From now on you'll be able to use the Trello APIs using `trelloAuthToken`
  };

  handleLoginFailure = message => {
    // Handle the authentication failure (maybe by showing an alert?)
  };

  render() {
    return (
      <View style={styles.container}>
        <TrelloLogin
          applicationName="React Native Trello Login Example"
          onLoginSuccess={this.handleLoginSuccess}
          onLoginFailure={this.handleLoginFailure}
          trelloApiKey={TRELLO_API_KEY}
          style={styles.webview}
        />
      </View>
    );
  }
}
```

## A complete example

See the `/example` folder for a complete example (login + logout).

## Available props

| Name            | Type   | Default      | Description                                                                 |
| --------------- | ------ | ------------ | --------------------------------------------------------------------------- |
| applicationName | string | **REQUIRED** | The application name shown to the user in the login process                 |
| debugEnabled    | bool   | false        | When true, shows a few useful `console.debug` logs during the login process |
| onLoginSuccess  | func   | **REQUIRED** | Callback invoked on a successful login ( callback parameter: auth token)    |
| onLoginSuccess  | func   | **REQUIRED** | Callback invoked on a failed login (callback parameter: error message)      |
| trelloApiKey    | string | **REQUIRED** | The [Trello API key](https://trello.com/app-key/)                           |
| style           | any    | null         | Style applied to the Trello login WebView                                   |

Please notice that you can also provide [any WebView prop](https://facebook.github.io/react-native/docs/webview).

## Useful resources

- [Trello auth docs](https://developers.trello.com/page/authorization)
- [Trello API docs](https://developers.trello.com/v1.0/reference#introduction)
- [Your Trello API key](https://trello.com/app-key/)
- [React-Native WebView docs](https://facebook.github.io/react-native/docs/webview)
