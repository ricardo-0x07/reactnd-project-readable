import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose  } from 'redux';
import ReduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'typeface-roboto';
import ManagePostForm from './ManagePostForm';
import PostDetails from './PostDetails';
import Category from './Category';
import Default from './Default';
import '../App.css';
import reducers from '../reducers';
import Header from './Header';
import NotFound from './NotFound';

class App extends React.Component {
    render() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose     
        const store = createStore(
            reducers,
            composeEnhancers(
                applyMiddleware(ReduxThunk)
            )
        );
        return (
            <Provider store={store}>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Default} className="Default"/>
                        <Route path="/postdetails/:id" component={PostDetails}/>
                        <Route path="/category/:id" component={Category}/>
                        <Route exact path="/create" component={ManagePostForm}/>
                        <Route path="/create/:id" component={ManagePostForm}/>
                        <Route component={NotFound}/>
                        <Route path="/404" component={NotFound}/>
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default App;
