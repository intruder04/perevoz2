import React, {Component} from 'react';
import {connect} from 'react-redux';

class Details extends Component {
    render () {
        if (!this.props.req) {
            return (<p>choose req</p>);
        }
        return (
            <div>
                <h2>{this.props.req.id}</h2>
                <h2>{this.props.req.desc}</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {req: state.active};
}

export default connect(mapStateToProps)(Details);