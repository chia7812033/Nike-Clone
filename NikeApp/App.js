import Navigation from "./src/Navigation";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import store from "./src/app/store";


export default function App() {
  return (
    <Provider store={store}>
      <Navigation />

      <StatusBar style='auto' />
    </Provider>
  );
}
