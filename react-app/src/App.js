import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import LoginSignupNav from "./components/NavBar/NavBarLogSign";
import LoggedInNav from "./components/NavBar/NavBarLogged";
import ExplorePage from "./components/Explore";
import PhotoDetail from "./components/PhotoDetail";
import ProfilePage from "./components/YouPage";
import UploadPhotoForm from "./components/UploadPhoto";
import AlbumForm from "./components/CreateAlbum";
import EditAlbumForm from "./components/EditAlbum";
import AlbumPage from "./components/AlbumPage";
import { authenticate } from "./store/session";
import { getAllAlbumsThunk } from "./store/album";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";


function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getAllAlbumsThunk());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginSignupNav />
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <LoginSignupNav />
          <SignUpForm />
        </Route>
        {/* no use for users yet */}
        {/* <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute> */}
        <Route path="/explore" exact={true}>
          {user ? <LoggedInNav /> : <NavBar />}
          <ExplorePage />
          <Footer />
        </Route>
        <Route path="/photos/new" exact={true}>
          {user ? <LoggedInNav /> : <NavBar />}
          <UploadPhotoForm />
        </Route>
        <Route path="/photos/:photoId" exact={true}>
          {user ? <LoggedInNav /> : <NavBar />}
          <PhotoDetail />
          <Footer />
        </Route>
        <Route path="/albums/new" exact={true}>
          <LoggedInNav />
          <AlbumForm />
        </Route>
        <Route path="/albums/:albumId" exact={true}>
          <LoggedInNav />
          <AlbumPage />
          <Footer />
        </Route>
        <Route path="/albums/:albumId/edit" exact={true}>
          <LoggedInNav />
          <EditAlbumForm />
        </Route>
        <Route path="/you" exact={true}>
          <LoggedInNav />
          <ProfilePage />
          <Footer />
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
