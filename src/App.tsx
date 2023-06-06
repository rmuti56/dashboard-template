import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import queryClient from "./libs/query";
import appRouter from "./router/AppRouter";
import store from "./store";
import appTheme from "./theme";
import ConfirmationDialog from "./components/ConfirmDialog";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { IS_DEV } from "./constants/config.constant";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {IS_DEV && <ReactQueryDevtools initialIsOpen={true} />}
      <StoreProvider store={store}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <ConfirmationDialog />
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
