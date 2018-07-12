import namor from "namor";
import moment from 'moment';
import _ from 'lodash';

const Order = () => {
  const accepted = Math.random() > 0.5 ? null : moment()
    .subtract(Math.ceil(Math.random() * 1000), 'day').format(moment.defaultFormatUtc);

  const completed = Math.random() > 0.5 ? null : moment()
    .subtract(Math.ceil(Math.random() * 1000), 'day').format(moment.defaultFormatUtc);

  return {
    'clientName': namor.generate({ words: 2, numbers: 0}),
    'clientPhone': Math.ceil(Math.random() * 10000000).toString(),
    'clientEmail': `${namor.generate({ words: 1, numbers: 0})}@mail.com`,
    'acceptedAt': accepted,
    'completedAt': completed,
    'description': namor.generate({ words: 4, numbers: 0})
  };
};

export const transformStatusColumnSort = sorted => {
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

export function sortData(data, sorted) {
  const sortingOrder = transformStatusColumnSort(sorted);
  return _.orderBy(
    data,
    sortingOrder.map(so => {
      return row => {
        if ((so.id === 'acceptedAt' || so.id === 'completedAt') && !row[so.id]) {
          return '1970-01-01T00:00:00Z'
        }

        return typeof row[so.id] === "string" ? row[so.id].toLowerCase() : row[so.id];
      };
    }),
    sortingOrder.map(so => so.desc ? 'desc' : 'asc')
  );
}

export function makeData(len = 5000) {
  return _.range(len).map(d => Order());
}
