import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { clearUserAlbumsThunk } from '../../store/album';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearUserAlbumsThunk());

    return history.push("/")
  };

  return <button className='logout-btn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
