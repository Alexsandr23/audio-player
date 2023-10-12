import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import {Router, Route, Link, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import {store} from "./storeCreate/store"
import './App.css';
import PageMain from "./pages/PageMain";
import Header from "./module/Header-Module/Header"
import HomeBtn from "./ui/HomeBtn"
import Aside from './components/Aside/Aside';
import {api} from "./storeCreate/api"
import WrapperMain from './ui/WpapperMain';
import Footer from "./components/Footer"
import PageTraks from './pages/PageTracks';
import PagePlayer from './pages/PagePlayer';
import PagePlaylist from './pages/PagePlaylist';
import BossComponentPlaylist from './module/playlists/BossComponentPlaylist';
import PageEditingUser from "./pages/PageEditingUser"
import PageSinglePlaylist from './pages/PageSinglePlaylist';
import PageSearchTrack from './pages/PageSearchTrack';
import PageMyTracks from './pages/PageMyTracks';


export const history = createHistory()
console.log(store)
console.log(api)
store.subscribe(() => console.log(store.getState()))



function App() {
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
          const authState = store.getState().auth
          setIsLoggedIn(authState.token)
        })
    
        return () => unsubscribe()
      }, [])
  
  return (
    <Provider store={store}>
        <Router history={history}>
            <Header 
                onSearchResults={result => setSearchResults(result)}
                loading={load => setIsLoading(load)}
            ></Header>
            <WrapperMain>
                <Aside>
                    <Link to="/" className="link"><HomeBtn/></Link>
                    {isLoggedIn && 
                        <>
                        <Link to="/tracks" className="link">Треки</Link>
                        <Link to="/playlist" className="link">Плейлисти</Link>
                        <Link to="/player" className="link">Плеєр</Link>
                        </>
                    }

                </Aside>
                <Switch>
                    <Route path="/"  render={(props) => <PageMain {...props} isLoggedIn={isLoggedIn}/>} exact/>
                    <Route path="/tracks" component={PageTraks} />
                    <Route path="/my-tracks" component={PageMyTracks} />
                    <Route path="/playlist/new" component={BossComponentPlaylist} exact />
                    <Route path="/playlist/:id" component={PageSinglePlaylist}/>
                    <Route path="/playlist" component={PagePlaylist}exact/>
                    <Route path="/player" component={PagePlayer} />
                    <Route path="/editing-personal" component={PageEditingUser} />
                    <Route path="/search" render={(props) => <PageSearchTrack {...props} results={searchResults} key={searchResults} loading={isLoading}/>} />
                </Switch>
            </WrapperMain>
            <Footer/>           
        </Router>
    </Provider>
  )
}

export default App;
