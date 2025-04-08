import "./App.css";
import Homepage from "./pages/Homepage";
import MoviePage from "./pages/MoviePage";
import { JSX, ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFoundPage />,
    children: [
      {
      path: "movies/:category",
      element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
        },
    ]
  },
]);



function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
