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
import Home from './components/home/Home.tsx';
import BlogDetails from './components/blogDetails/BlogDetails.tsx';
import { SignUpPage } from './components/auth/Signup.tsx';
import { SignInPage } from './components/auth/Signin.tsx';
import { AuthProvider } from './components/auth/AuthProvider.tsx';
import { AddBlogPage } from './components/addBlog/AddBlog.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<h1>About Page</h1>} />
      <Route path="contact" element={<h1>Contact Page</h1>} />
      <Route path="blogs/:id" element={<BlogDetails />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />

      {/* Protected section */}
      <Route element={<ProtectedRoute />}>
        <Route path="add-blog" element={<AddBlogPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
