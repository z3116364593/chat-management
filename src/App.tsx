import React, { useEffect } from 'react';
import './App.css';
import { Route, HashRouter } from 'react-router-dom'
import route from './router/index'

const App = (): any => {
  useEffect(() => {
    if(window.location.hash === '#/') {
      window.location.hash = '#/login'
    }
  }, [])

  return (
    <div className="App">
      <HashRouter>
        {
          route.map((item: any, index: number) => {
            return (
              <Route exact={item.exact} path={item.path} component={item.component} key={index}></Route>
            )
          })
        }
      </HashRouter>
    </div>
  )
}

export default App;
