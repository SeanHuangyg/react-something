import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter ,Route ,Switch } from 'react-router-dom';
import Index from './HomeComponent/index';
import FirstComponent from './FirstComponent/index';
 
ReactDOM.render(
    <div>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Index} exact />
                <Route path='/firstComponent' component={FirstComponent} />
            </Switch>
        </BrowserRouter>
    </div>
    , document.getElementById('root'));