import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import LoginSignupNav from "./components/NavBar/NavBarLogSign";
import LoggedInNav from "./components/NavBar/NavBarLogged";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import ExplorePage from "./components/Explore";
import PhotoDetail from "./components/PhotoDetail";
import ProfilePage from "./components/YouPage";
import UploadPhotoForm from "./components/UploadPhoto";
import { getAllUsers } from "./store/session";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  console.log("am i the user? ---------->", user);

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
    <>
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
          {user ? <LoggedInNav /> : <NavBar />}
          <ExplorePage />
        </Route>
        <Route path="/photos/new" exact={true}>
          {user ? <LoggedInNav /> : <NavBar />}
          <UploadPhotoForm />
        </Route>
        <Route path="/photos/:photoId" exact={true}>
          {user ? <LoggedInNav /> : <NavBar />}
          <PhotoDetail />
        </Route>
        <Route path="/you" exact={true}>
          <LoggedInNav />
          <ProfilePage />
        </Route>
        <Route path="/" exact={true}>
          <NavBar />
          <SplashPage />
          <Footer />
        </Route>
      </Switch>
    </>
  );
}

export default App;
