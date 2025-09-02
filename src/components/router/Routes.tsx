import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '../Layout';
import Home from '../home/Home';
import BlogDetails from '../blogDetails/BlogDetails';
import { SignUpPage } from '../auth/Signup';
import { SignInPage } from '../auth/Signin';
import { AddBlogPage } from '../addBlog/AddBlog';
import { ProtectedRoute } from './ProtectedRoute';
import { AboutPage } from '../About';
import { ContactPage } from '../Contact';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
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
