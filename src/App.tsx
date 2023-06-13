import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConverterPage } from "./pages/ConverterPage";
import { EnvironmentPage } from "./pages/EnvironmentPage";
import { SettingsPage } from "./pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConverterPage />,
  },
  {
    path: "/environment",
    element: <EnvironmentPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
