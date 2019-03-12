import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import ArticleDetails from "./components/articles/ArticleDetails";
import ArticleList from "./components/articles/ArticleList";
import NotFound from "./components/NotFound"
import Notifications from "./components/shared/Notifications"
import About from "./components/About"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <div className='container'>
                        <Header/>
                        <Notifications/>
                        <Switch>

                            {/* Article routes */}
                            <Redirect exact={true} from='/' to='/articles'/>

                            <Route
                                path={["/articles",
                                    "/articles/by_tag/:tag_slug", "/articles/by_category/:category_slug",
                                    "/articles/by_author/:username"]}
                                exact component={ArticleList}/>
                            <Route exact={true} from='/articles/new' component={(props) => <h1>Not Implemented</h1>}/>
                            <Route path="/articles/:slug" component={ArticleDetails}/>

                            <Route path="/about" component={About}/>
                            {/* Authentication routes */}
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/logout" component={Logout}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                    <Footer/>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
