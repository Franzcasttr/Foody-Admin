import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectCurrentToken, setCredentials } from '../features/auth/authSlice';
import { useRefreshQuery } from '../features/auth/refreshApiSlice';

import Loading from '../Utils/Loading';

const PersistLog = () => {
  const dispatch = useDispatch();

  const { data, isLoading: loading, isSuccess } = useRefreshQuery();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    !token && isSuccess && dispatch(setCredentials(data));
  }, [isSuccess]);

  return loading ? <Loading /> : <Outlet />;
};

export default PersistLog;
