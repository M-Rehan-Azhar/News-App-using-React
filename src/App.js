import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react';
import News from './components/News';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const router = (progressHandler) => createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <News key="general" pageSize={9} country="in" category="general" setProgress={progressHandler} />
      </>
    ),
  },
  {
    path: "/business",
    element: (
      <>
        <Navbar />
        <News key="business" pageSize={9} country="in" category="business" setProgress={progressHandler} />
      </>
    ),
  },
  {
    path: "/entertainment",
    element: (
      <>
        <Navbar />
        <News key="entertainment" pageSize={9} country="in" category="entertainment" setProgress={progressHandler} />
      </>
    ),
  },
  {
    path: "/health",
    element: (
      <>
        <Navbar />
        <News key="health" pageSize={9} country="in" category="health" setProgress={progressHandler} />
      </>
    ),
  },
  {
    path: "/science",
    element: (
      <>
        <Navbar />
        <News key="science" pageSize={9} country="in" category="science" setProgress={progressHandler} />
      </>
    ),
  },
  {
    path: "/sports",
    element: (
      <>
        <Navbar />
        <News key="sports" pageSize={9} country="in" category="sports" setProgress={progressHandler} />
      </>
    ),
  },
  {
    path: "/technology",
    element: (
      <>
        <Navbar />
        <News key="technology" pageSize={9} country="in" category="technology" setProgress={progressHandler} />
      </>
    ),
  },
]);

export default class App extends Component {
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    return (
      <>
        <LoadingBar color="#f11946" progress={this.state.progress} onLoaderFinished={() => this.setProgress(0)} />
        <RouterProvider router={router(this.setProgress)} />
      </>
    );
  }
}
