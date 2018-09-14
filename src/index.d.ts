declare module "react-native-trello-login" {
  import { Component, ReactNode } from "react";
  import { StyleProp, ViewStyle } from "react-native";

  export interface TrelloLoginProps {
    isDebugEnabled?: boolean;
    onLoginFailure: (message: string) => void;
    onLoginSuccess: (trelloApiToken: string) => void;
    trelloApiKey: string;
  }

  class TrelloLogin extends Component<TrelloLoginProps> {}

  export default TrelloLogin;
}
