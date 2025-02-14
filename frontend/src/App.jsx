import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import AllBooks from "./pages/AllBooks"
import BooksByCategory from "./pages/BooksByCategory"
import BooksByAuthor from "./pages/BooksByAuthor"
import BookShop from "./pages/BookShop"
import Cgv from "./pages/Cgv"
import Rgpd from "./pages/Rgpd"
import ContactMsg from "./pages/ContactMsg"
import Basket from "./pages/Basket"
import OrderValidate from "./pages/OrderValidate"
import Payment from "./pages/Payment"
import Success from "./pages/Success"

import Register from "./pages/user/Register"
import Login from "./pages/user/Login"
import Profil from "./pages/user/Profil"
import UserOrderDetail from "./pages/user/UserOrderDetail"

import Admin from "./pages/admin/Admin"
import AddBook from "./pages/admin/books/AddBooks"
import BooksList from "./pages/admin/books/BooksList"
import EditBook from "./pages/admin/books/EditBook"
import AddAuthors from "./pages/admin/books/AddAuthors"
import EditAuthor from "./pages/admin/books/EditAuthor"
import AddCategories from "./pages/admin/books/AddCategories"
import EditCategory from "./pages/admin/books/EditCategory"
import AddConditions from "./pages/admin/books/AddConditions"
import OrdersList from "./pages/admin/orders/OrdersList"
import OrderDetailsAdm from "./pages/admin/orders/OrderDetailsAdm"
import UsersAdmin from "./pages/admin/users/UsersAdm"
import MsgContats from "./pages/admin/contacts/MsgContacts"
import Message from "./pages/admin/contacts/Message"
import '../src/css/style.css'
import { Routes, Route, Navigate } from "react-router-dom"

import RequireAuth from "./helpers/requireAuth"


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RequireAuth child={Home} auth={false} admin={false} />} />
        <Route path="/detail/:id" element={<RequireAuth child={Detail} auth={false} admin={false} />} />
        <Route path="/allbooks" element={<RequireAuth child={AllBooks} auth={false} admin={false} />} />
        <Route path="/booksCategory/:id" element={<RequireAuth child={BooksByCategory} auth={false} admin={false} />} />
        <Route path="/booksAuthors/:id" element={<RequireAuth child={BooksByAuthor} auth={false} admin={false} />} />
        <Route path="/basket" element={<RequireAuth child={Basket} auth={false} admin={false} />} />
        <Route path="/ordervalidate/:id" element={<RequireAuth child={OrderValidate} auth={true} admin={false} />} />
        <Route path="/payment/:id" element={<RequireAuth child={Payment} auth={true} admin={false} />} />
        <Route path="/success" element={<RequireAuth child={Success} auth={true} admin={false} />} />
        <Route path="/cgv" element={<RequireAuth child={Cgv} auth={false} admin={false} />} />
        <Route path="/rgpd" element={<RequireAuth child={Rgpd} auth={false} admin={false} />} />
        <Route path="/contact" element={<RequireAuth child={ContactMsg} auth={false} admin={false} />} />
        <Route path="/bookshop" element={<RequireAuth child={BookShop} auth={false} admin={false} />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<RequireAuth child={Profil} auth={true} admin={false} />} />
        <Route path="/user/orderDetail/:id" element={<RequireAuth child={UserOrderDetail} auth={true} admin={false} />} />

        <Route path="/admin" element={<RequireAuth child={Admin} auth={true} admin={true} />} />
        <Route path="/admin/addbooks" element={<RequireAuth child={AddBook} auth={true} admin={true} />} />
        <Route path="/admin/books" element={<RequireAuth child={BooksList} auth={true} admin={true} />} />
        <Route path="/admin/Edit/:id" element={<RequireAuth child={EditBook} auth={true} admin={true} />} />
        <Route path="/admin/addauthors" element={<RequireAuth child={AddAuthors} auth={true} admin={true} />} />
        <Route path="/admin/editauthor/:id" element={<RequireAuth child={EditAuthor} auth={true} admin={true} />} />
        <Route path="/admin/addcategories" element={<RequireAuth child={AddCategories} auth={true} admin={true} />} />
        <Route path="/admin/editcat/:id" element={<RequireAuth child={EditCategory} auth={true} admin={true} />} />
        <Route path="/admin/addconditions" element={<RequireAuth child={AddConditions} auth={true} admin={true} />} />
        <Route path="/admin/orders" element={<RequireAuth child={OrdersList} auth={true} admin={true} />} />
        <Route path="/admin/orderdetails/:id" element={<RequireAuth child={OrderDetailsAdm} auth={true} admin={true} />} />
        <Route path="/admin/users" element={<RequireAuth child={UsersAdmin} auth={true} admin={true} />} />
        <Route path="/admin/contacts" element={<RequireAuth child={MsgContats} auth={true} admin={true} />} />
        <Route path="/admin/contacts/:id" element={<RequireAuth child={Message} auth={true} admin={true} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
