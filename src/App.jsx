import Router from './Router';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style/globalStyle';
import { theme } from './style/theme';
import { Provider } from "react-redux";
import store, { persistor } from "./store"; // store와 persistor 모두 가져오기
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}> {/* Redux Provider로 전체 앱 감싸기 */}
      <PersistGate loading={null} persistor={persistor}> {/* PersistGate로 상태 복원 */}
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
