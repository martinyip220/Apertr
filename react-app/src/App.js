import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import LoginSignupNav from "./components/NavBar/NavBarLogSign";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import ExplorePage from "./components/Explore";
import PhotoDetail from "./components/PhotoDetail";
import { getAllUsers } from "./store/session";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getAllUsers());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/login" exact={true}>
          <LoginSignupNav />
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <LoginSignupNav />
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/explore" exact={true}>
          <NavBar />
          <ExplorePage />
        </Route>
        <Route path="/photos/:photoId" exact={true}>
          <PhotoDetail />
        </Route>
        <Route path="/" exact={true}>
           <NavBar />
          <SplashPage />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
