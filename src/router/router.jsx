import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AddBlog from "../pages/AddBlog";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import AllBlogs from './../pages/AllBlogs';
import Wishlist from "../pages/Wishlist";
import BlogDetails from "../pages/BlogDetails";
import UpdateBlog from "../pages/UpdateBlog";
import PrivateRoute from "../context/PrivateRoute";
import Loading from "../pages/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/addblog',
        element: <PrivateRoute>
           <AddBlog></AddBlog>
        </PrivateRoute>,
      },
      {
        path: '/auth/login',
        element: <Login></Login>,
      },
      {
        path: '/auth/register',
        element: <Register></Register>,
      },
      {
        path: '/featured',
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      {
        path: '/allblogs',
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: '/wishlist',
        element:<PrivateRoute>
           <Wishlist></Wishlist>
        </PrivateRoute>,
      },
      {
        path: '/blogdetails/:id',
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: '/updateblog/:id',
        element: <PrivateRoute>
           <UpdateBlog></UpdateBlog>
        </PrivateRoute>,
      },
    ]
  }]);

export default router;