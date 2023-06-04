import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider as StoreProvider } from "react-redux";
import appTheme from "./theme";
import { RouterProvider } from "react-router-dom";
import appRouter from "./router/AppRouter";
import store from "./store";

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
