import logo from './logo.svg';
import './App.scss';
import React, {useState, useEffect} from 'react';
import {Router, Route, Link, Redirect, useParams, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import createHistory from "history/createBrowserHistory";
import { configureStore, createSlice} from '@reduxjs/toolkit';

import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: 'http://shop-roles.node.ed.asmer.org.ua/graphql',
//      prepareHeaders(headers, {getState}){
//          ....
//      }
    }),
    endpoints: (builder) => ({
        getRootCats:builder.query({
            query: () => ({
                document: `query {
                                CategoryFind(query: "[{\\"parent\\": null}]"){
                                    _id name
                                }
                            }`
            }),
        }),
        login: builder.mutation({
            query: ({login, password}) => ({
                document: `
                    query login($login: String, $password: String) {
                        login(login: $login, password: $password) 
                    }
                    `,
                variables: {login, password}})
        }),
        getCategoryById: builder.query({
            query: (_id) => ({
                document: `query oneCat($query: String){
                    CategoryFindOne(query:$query){
                        _id name goods{
                            _id name price images{
                                url
                            }
                        }
                    }
                }
                `,
                variables: {query: JSON.stringify([{_id}])}
            })   
        }),
    })
})

console.log(api)
const {useGetRootCatsQuery, useGetCategoryByIdQuery} = api

const CategoryLink = ({cat:{_id, name}}) => <li><Link to={`/category/${_id}`}>{name}</Link></li>

const LeftMenu = () => {
    const {isLoading, data} = useGetRootCatsQuery()
    console.log(isLoading, data)
    return isLoading ? <strong>LOADING</strong> : 
                       <aside><ul>{data.CategoryFind.map(cat => <CategoryLink key={cat._id} cat={cat} />)}</ul></aside>
}

const PageCategory = () => {
    const {_id} = useParams()
    const {isLoading, data} = useGetCategoryByIdQuery(_id)
    console.log(data)
    return <main>{_id} {data && data.CategoryFindOne.name}</main>
}

const jwtDecode = token => {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch(e) {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {token: null, payload: null},
    reducers: {
        login(state, {payload:token}){
            // console.log('LOGIN', state, token)
            const payload = jwtDecode(token)
            if (payload){
                state.payload = payload
                state.token   = token
            }
            // return {payload, token}
        },
        logout(state){
            // console.log('LOGOUT', state)
            state.payload = null
            state.token   = null
        }
    }
})
console.log(authSlice)

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(api.middleware) //
})

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2Mzc3ZTEzM2I3NGUxZjVmMmVjMWMxMjUiLCJsb2dpbiI6InRlc3Q1IiwiYWNsIjpbIjYzNzdlMTMzYjc0ZTFmNWYyZWMxYzEyNSIsInVzZXIiXX0sImlhdCI6MTY2ODgxMjQ1OH0.t1eQlRwkcP7v9JxUPMo3dcGKprH-uy8ujukNI7xE3A0"

store.subscribe(() => console.log(store.getState()))
console.log(authSlice.actions.login(token))
store.dispatch(authSlice.actions.login(token))


const history = createHistory()

const Page404 = () => <h1>404</h1>


const PageMain = () => 
<main>
    Це головна сторінка
</main>

const PageAbout = () => 
<main>
    Це сторінка про нас
</main>

const Header = ({children}) =>
<header style={{backgroundColor: '#DDD', minHeight: '100px'}}>
    {children}
</header>

const Footer = ({children}) =>
<footer style={{backgroundColor: 'gray', minHeight: '50px'}}>
    {children}
</footer>

const AddComponent = (props) => {
    // console.log(props) ///???? {}
    const {a, b} = useParams()
    return (<div>
        {a} + {b} = {+a + +b}
    </div>)
}

const PageAdd = (props) => {
    // console.log(props)
    // const {match: {params: {a,b}}} = props
    return (
        <div>
            <h1>Заголовок Страницьі сложения</h1>
            <AddComponent />
            <h3>пока-пока</h3>
        </div>
    )
}


function App(){
    return (
        <Provider store={store}>
            <Router history={history}>
                <Header>
                    <Link to="/">Головна</Link>
                    <a href="/">Головна</a>
                    <Link to="/about">Про нас</Link>
                    <Link to="/add/5/2">5 + 2</Link>
                    <Link to="/add/50/2">50 + 2</Link>
                </Header>
                <LeftMenu />
                <Switch>
                    <Route path="/" component={PageMain} exact/>
                    <Route path="/category/:_id" component={PageCategory} exact/>
                    <Redirect from='/main' to="/" />
                    <Route path="/about" component={PageAbout} />
                    <Route path="/add/:a/:b" component={PageAdd} />
                    <Route path="*" component={Page404} />
                </Switch>
                <Footer>
                    какой-то логотип и ваще подвал сайта
                </Footer>
            </Router>
        </Provider>
    )
}



export default App;
