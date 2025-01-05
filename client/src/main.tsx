import ReactDOM from "react-dom/client";
import App from "./App";

const el = document.getElementById("root")
if(el){
ReactDOM.createRoot(el).render(
  <App />
);
}