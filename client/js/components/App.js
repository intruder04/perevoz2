import React from 'react';
// import '../../css/style.css';
// import ReqList from '../containers/reqs-list';
// import Details from '../containers/details';
import NavigationBar from '../containers/NavigationBar';
// import Greetings from './Greetings';
// import Signup from './signup/Signup';
import {hot} from 'react-hot-loader';


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <NavigationBar />
                {this.props.children}
                {/* <Greetings />
                <Signup /> */}
                {/* <h3>Reqs!:</h3> */}
                {/* <ReqList /> */}
                {/* <Details /> */}
            </div>
                
            
        );
    }
}

export default hot(module)(App);