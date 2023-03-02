import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import Main from "./pages/Main";
import GlobalStyles from "./styles/global";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Main />
    <GlobalStyles />
  </StrictMode>
);
