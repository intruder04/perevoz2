import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Calls } from '../../actions/getCalls';
// import axios from 'axios';
import { connect } from 'react-redux';


class CallsGrid extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         callsData: []
    //     };
    //     // this.onChange = this.onChange.bind(this);
    //     // this.onSubmit = this.onSubmit.bind(this);
    // }


    componentWillMount() {
        console.log("in mount");
        this.props.Calls();
    }

    render() {
        if (!this.props.calls) {
            return <div>Загрузка</div>;
        }

        return (
             <BootstrapTable data={this.props.calls} version='4'>
                <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='username'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        )
    }

}

function mapStateToProps(state) {
    return {
        calls: state.calls
    }
}

export default connect(mapStateToProps, {Calls})(CallsGrid);