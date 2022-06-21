import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

//This gets the only <div> on the HTML page, as the root for all future react components to be rendered in. This is what makes it a single page website.
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
