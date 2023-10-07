import React, { useState } from 'react';
import { Provider } from 'react-redux';
import {Router, Route, Link, Redirect, useParams, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import {store} from "./storeCreate/store"
import './App.css';
// import { useState } from 'react-redux';
import PageMain from "./pages/PageMain";
import Header from "./module/Header-Module/Header"
import HomeBtn from "./ui/HomeBtn"
import Aside from './components/Aside/Aside';
import {api} from "./storeCreate/api"
import WrapperMain from './ui/WpapperMain';
import Footer from "./components/Footer"
import Snack from "./ui/Snack"
import PageTraks from './pages/PageTracks';
import PagePlayer from './pages/PagePlayer';
import PagePlaylist from './pages/PagePlaylist';
import BossComponentPlaylist from './module/playlists/BossComponentPlaylist';
import PageEditingUser from "./pages/PageEditingUser"
import PageSinglePlaylist from './pages/PageSinglePlaylist';

export const history = createHistory()
console.log(store)
console.log(api)
store.subscribe(() => console.log(store.getState()))

function App() {

    
  
  return (
    <Provider store={store}>
        <Router history={history}>
            <Header ></Header>
            <WrapperMain>
                <Aside>
                    <Link to="/" className="link"><HomeBtn/></Link>
                    <Link to="/tracks" className="link">Треки</Link>
                    <Link to="/playlist" className="link">Плейлисти</Link>
                    <Link to="/player" className="link">Плеєр</Link>
                </Aside>
                <Switch>
                    <Route path="/" component={PageMain} exact/>
                    <Route path="/tracks" component={PageTraks} />
                    <Route path="/playlist/new" component={BossComponentPlaylist} exact />
                    {/* <Route path="/playlist-editing/:id" component={BossComponentPlaylist} exact /> */}
                    <Route path="/playlist/:id" component={PageSinglePlaylist}/>
                    <Route path="/playlist" component={PagePlaylist}exact/>
                    <Route path="/player" component={PagePlayer} />
                    <Route path="/editing-personal" component={PageEditingUser} />
                </Switch>
            </WrapperMain>
            <Footer/>           
        </Router>
    </Provider>
  )
}

export default App;
