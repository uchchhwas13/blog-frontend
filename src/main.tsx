import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './components/Home.tsx';
import BlogDetails from './components/BlogDetails.tsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { path: '', element: <Home /> },
//       { path: 'about', element: <h1>About Page</h1> },
//       {
//         path: 'contact',
//         element: <h1>Contact Page</h1>,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<h1>About Page</h1>} />
      <Route path="contact" element={<h1>Contact Page</h1>} />
      <Route path="blog/:id" element={<BlogDetails />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
