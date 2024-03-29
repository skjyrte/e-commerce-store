import "./stylesheets";
import {App} from "./components/App";
import {createRoot} from "react-dom/client";
const root = createRoot(document.getElementById("root") as HTMLDivElement);

root.render(<App />);
