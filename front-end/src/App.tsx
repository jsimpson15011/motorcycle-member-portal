import React from 'react';
import './App.css';
import Nav from "./modules/system/components/Nav/Nav";
import {Provider} from "react-redux";
import store from "./modules";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <Nav/>
          </div>
      </Provider>
  );
}

export default App;
