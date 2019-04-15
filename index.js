import { AppRegistry } from "react-native";
import App from './src/index';

AppRegistry.registerComponent("thefarma", () => App);

import bgMessaging from "./src/cloudmessaging/bgMessaging";
AppRegistry.registerHeadlessTask("RNFirebaseBackgroundMessage", () => bgMessaging);
