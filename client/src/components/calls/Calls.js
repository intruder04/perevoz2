import React from 'react';
import CallsGrid from './CallsGrid';

class Calls extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4"></div>
                <h1>Hellod2</h1>
                <CallsGrid history={this.props.history}/>
            </div>
        );
    }
}


export default Calls;