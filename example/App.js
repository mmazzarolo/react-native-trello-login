import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import TrelloLogin from "react-native-trello-login";

const TRELLO_API_KEY = "";

export default class App extends React.Component {
  state = {
    trelloAuthToken: null
  };

  handleLoginSuccess = trelloAuthToken => {
    this.setState({ trelloAuthToken: trelloAuthToken });
  };

  handleLoginFailure = message => {
    Alert.alert("Error", message);
  };

  handleLogoutPress = () => {
    this.setState({ trelloAuthToken: null });
  };

  render() {
    const { trelloAuthToken } = this.state;
    return (
      <View style={styles.container}>
        {trelloAuthToken && (
          <View style={styles.loggedInContainer}>
            <Text style={styles.text}>
              {`Your Trello auth token is:\n${trelloAuthToken}`}
            </Text>
            <Button title="Logout" onPress={this.handleLogoutPress} />
          </View>
        )}
        {!trelloAuthToken && (
          <TrelloLogin
            applicationName={"React Native Trello Login Example"}
            debugEnabled={true}
            onLoginSuccess={this.handleLoginSuccess}
            onLoginFailure={this.handleLoginFailure}
            trelloApiKey={TRELLO_API_KEY}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    paddingTop: 20
  },
  loggedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    marginBottom: 30,
    marginHorizontal: 20,
    fontSize: 22,
    textAlign: "center",
    color: "rgba(0,0,0,0.8)"
  }
});
