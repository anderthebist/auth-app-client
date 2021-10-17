import React, { useEffect, useState } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from './redux/reducers/appReducer';
import { StateType } from './redux/redux';
import Preloader from './components/Preloader/Preloader';
import { PreloaderSize } from './utils/enums';
import AppRouter from './components/routes/AppRouter';

const App:React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: StateType) => state.app.isLoading);   

  useEffect(() => {
    dispatch(loading());
  },[])

  if(!isLoading) return (<div className = "full_height"><Preloader size = {PreloaderSize.Big} /></div>);

  return (
    <div className="wrapper">
      <AppRouter />
    </div>
  );
}

export default App;
