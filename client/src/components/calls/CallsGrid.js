import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getCalls } from '../../actions/getCalls';
import axios from 'axios';


class CallsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            callsData: []
        };
        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }
      
    componentDidMount() {
        axios.get('/api/calls').then(
            (res) => this.setState({ callsData: res.data.user })
        );
    }

    render() {
        const { callsData } = this.state;
        if (!this.state.callsData) {
            return <div>Загрузка</div>;
        }

        return (
            <BootstrapTable data={callsData} version='4'>
                <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='username'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        )
    }

}

export default CallsGrid;