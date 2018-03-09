import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectReq} from '../actions/index';


class ReqList extends Component {
    showList(){
        return this.props.req.map((req) => {
            return (
                <li onClick={() => this.props.selectReq(req)} key={req.id}>
                    {req.desc}
                </li>
            )
        });
    }
    render () {
        return (
            <ol>
               {this.showList()}
            </ol>
        );
    }
}

function mapStateToProps(state) {
    return{
        req: state.req
    };
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({selectReq: selectReq}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ReqList);