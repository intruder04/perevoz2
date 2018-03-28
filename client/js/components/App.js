import React from 'react';
import NavigationBar from '../containers/NavigationBar';
import {hot} from 'react-hot-loader';
import FlashMessagesList from './flash/FlashMessagesList';


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <NavigationBar/>
                <FlashMessagesList/>
                {this.props.children}
            </div>
                
            
        );
    }
}

export default hot(module)(App);