import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeData, sortData, transformStatusColumnSort } from './Utils';
import { Grid, Row } from 'react-bootstrap';
import './Table.css';

const rawData = makeData(500);

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
  }

  fetchData = (state, instance) => {
    this.setState({ loading: true });
    processData(state.pageSize, state.page, state.sorted)
      .then(res => this.setState({ data: res.rows, pages: res.pages, loading: false }));
  };

  render() {
    const { data, pages, loading } = this.state;
    return(
      <Grid fluid>
        <Row>
          <h1>OrVisual admininstration view</h1>
        </Row>
        <Row>
          <ReactTable
            columns={[{
              Header: 'Client Info',
              columns: [{
                Header: 'Name',
                accessor: 'clientName'
              }, {
                Header: 'Phone',
                accessor: 'clientPhone'
              }]
            }, {
              Header: 'Order Status',
              id: 'orderStatus',
              accessor: d => { return { acceptedAt: d.acceptedAt, completedAt: d.completedAt }; },
              Cell: row => transformColumns(row)
            }]}
            manual
            data={data}
            pages={pages}
            loading={loading}
            onFetchData={this.fetchData}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </Row>
      </Grid>
   );
  }
}

const StatusSpan = (props) => {
  return(
    <span>
      <span style={{ color: props.color, transition: 'all .3s ease'}}>&#x25cf;&nbsp;</span>
      {props.status}
    </span>
  );
};

const processData = (pageSize, pageNum, sorted) => {
  const sortOrders = transformStatusColumnSort(sorted);
  const url = sortOrders.reduce((accUrl, sort) => {
    accUrl.searchParams.append('sort', `${sort.id},${sort.desc ? 'desc' : 'asc'}`);
    return accUrl;
  }, new URL('/api/orders', window.origin));
  url.searchParams.append('page', pageNum);
  url.searchParams.append('size', pageSize);

  console.log('Request url:', url);

  return fetch(url)
    .then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
    .then(data => {
      return {
        rows: data['_embedded']['orders'],
        pages: data['page']['totalPages']
      };
    }).catch(error => console.error('Failed: ', error));

  // return new Promise((resolve, reject) => {
  //   let filteredData = rawData;
  //   const sortedData = sortData(filteredData, sorted);
  //   const res = {
  //     rows: sortedData.slice(pageSize * pageNum, pageSize * pageNum + pageSize),
  //     pages: Math.ceil(filteredData.length / pageSize)
  //   };
  //
  //   setTimeout(() => resolve(res), 500);
  // });
};

const transformColumns = row => {
  if (row.value) {
    if (row.value['acceptedAt']) {
      return row.value['completedAt'] ? (<StatusSpan color='#8e8e8e' status='Completed' />) :
        (<StatusSpan color='#25ba18' status='In progress' />);
    } else {
      return row.value['completedAt'] ? (<StatusSpan color='#e5e21d' status='Closed' />) :
        (<StatusSpan color='#6b70ff' status='New' />);
    }
  } else {
    return(<span></span>);
  }
};


export default Table;
