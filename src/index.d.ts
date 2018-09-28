declare module "react-native-trello-login" {
  import { Component } from "react";
  import { StyleProp, ViewStyle } from "react-native";

  export interface TrelloLoginProps {
    applicationName: string;
    debugEnabled?: boolean;
    onLoginFailure: (message: string) => void;
    onLoginSuccess: (trelloApiToken: string) => void;
    trelloApiKey: string;
    style: ViewStyle;
  }

  class TrelloLogin extends Component<TrelloLoginProps> {}

  export default TrelloLogin;
}
