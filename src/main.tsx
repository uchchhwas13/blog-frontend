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
import Home from './components/Home/Home.tsx';
import BlogDetails from './components/BlogDetails.tsx';
import { SignUpPage } from './components/auth/Signup.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<h1>About Page</h1>} />
      <Route path="contact" element={<h1>Contact Page</h1>} />
      <Route path="blogs/:id" element={<BlogDetails />} />
      <Route path="login" element={<h1>Log in</h1>} />
      <Route path="signup" element={<SignUpPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
