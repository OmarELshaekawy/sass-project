import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Compontes/Home/Home";
import ItemsDetails from "./Compontes/ItemsDetails/ItemsDetails";
import Layout from "./Compontes/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "item/:id", element: <ItemsDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
