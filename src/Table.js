import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Grid, Row } from 'react-bootstrap';
import './Table.css';


/**
 * This component represent Order management table.
 */
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

/**
 * Renders Order status column cell.
 * @param color: color of bullet before status descriptor
 * @param status: status text descriptor
 * @return JSX component
 */
const StatusSpan = (props) => {
  return(
    <span>
      <span style={{ color: props.color, transition: 'all .3s ease'}}>&#x25cf;&nbsp;</span>
      {props.status}
    </span>
  );
};

/**
 * Fetch data from API service. Each parameter will be given to
 * server side.
 * @param pageSize: page's size
 * @param pageNum: page number
 * @param sorted: sorting descriptor
 * @return Promise
 */
const processData = (pageSize, pageNum, sorted) => {

  const sortOrders = transformStatusColumnSort(sorted);
  const url = sortOrders.reduce((accUrl, sort) => {
    accUrl.searchParams.append('sort', `${sort.id},${sort.desc ? 'desc' : 'asc'}`);
    return accUrl;
  }, new URL('/api/orders', window.origin));
  url.searchParams.append('page', pageNum);
  url.searchParams.append('size', pageSize);

  return fetch(url)
    .then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
    .then(data => {
      return {
        rows: data['_embedded']['orders'],
        pages: data['page']['totalPages']
      };
    }).catch(error => console.error('Failed: ', error));
};

/**
 * Transform 'acceptedAt' and 'completedAt' cells to the
 * JSX component.
 * @param row: table row
 * @return JSX component
 */
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

/**
 * Transform sorting descriptor. Change 'orderStatus' item to
 * 'acceptedAt' and 'completedAt' items with same sort order.
 * @param sorted: sorting descriptor
 * @return sorting descriptor
 */
const transformStatusColumnSort = sorted => {
  const columnIndex = sorted.findIndex(sort => sort.id === 'orderStatus');
  if (columnIndex >= 0) {
    const copiedSorted = Object.assign([], sorted);
    const sort = copiedSorted[columnIndex];
    copiedSorted.splice(columnIndex, 1, { id: 'acceptedAt', desc: sort.desc });
    copiedSorted.splice(columnIndex, 0, { id: 'completedAt', desc: sort.desc});

    return copiedSorted;
  }

  return sorted;
};


export default Table;
