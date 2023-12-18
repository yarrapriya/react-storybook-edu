// import '@fontsource/lato';
import { theme } from '@geneo2-web/shared-ui';
import { ThemeProvider } from '@mui/material';
import * as ReactDOM from 'react-dom/client';

import '@fontsource/lato';
import '@fontsource/poppins';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { GlobalContextProvider } from './app/Context/GlobalContextProvider';
import { persistor, store } from './reduxStore/store';
import { router } from './routeHandling/Routes/Routes';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalContextProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </GlobalContextProvider>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
