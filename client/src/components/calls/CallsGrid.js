import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Calls } from '../../actions/getCalls';
import { connect } from 'react-redux';

let order = 'desc';

const options = {
    onRowClick: function(row) {
        alert(`You click row id: ${row.id}`);
    }
};

class CallsGrid extends React.Component {
    handleBtnClick = () => {
        if (order === 'desc') {
          this.refs.table.handleSort('asc', 'name');
          order = 'asc';
        } else {
          this.refs.table.handleSort('desc', 'name');
          order = 'desc';
        }
      }

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
        console.log("this.props.calls ",this.props.calls);
        if (!this.props.calls) {
            return <div>Загрузка</div>;
        }

        return (
             <BootstrapTable ref='table' data={this.props.calls} options={ options } pagination version='4'>
                <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataSort={ true } dataField='username' filter={ { type: 'TextFilter', delay: 1000 } }>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email' filter={ { type: 'TextFilter', delay: 1000 } }>Product Price</TableHeaderColumn>
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