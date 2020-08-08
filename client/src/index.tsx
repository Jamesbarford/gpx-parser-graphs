import * as React from "react";
import { isNil } from "lodash";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";

import { store } from "./store/store";
import { GpxUploadConnected } from "./components/GpxUploader";
import { AppRouter } from "./App/Router";

if (process.env.NODE_ENV === "development") {
    // easy for debugging
    import("lodash").then(lodash => (window._ = lodash));
}

const App: React.FC = () => (
    <Provider store={store}>
        <CssBaseline />
        <GpxUploadConnected />
        <AppRouter />
    </Provider>
);

const root = document.getElementById("root");

if (isNil(root)) throw new Error("no valid root for application");

render(<App />, root);
