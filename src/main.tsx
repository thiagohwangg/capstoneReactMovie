import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "./assets/style.css";
// antd
import { StyleProvider } from "@ant-design/cssinjs";

// toastify message
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "store";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ToastContainer />
        <ConfigProvider theme={{
            token : {
                colorPrimary : '#821315',
            }
        }}>
            <StyleProvider hashPriority="high">
                <Provider store={store}>
                    <App />
                </Provider>
            </StyleProvider>
        </ConfigProvider>
    </BrowserRouter>
);
