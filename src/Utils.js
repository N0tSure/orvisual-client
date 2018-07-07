import namor from "namor";
import moment from 'moment';

const range = len => {
  const result = new Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = i;
  }

  return result;
};

const Order = () => {
  const accepted = Math.random() < 0.01 ? null : moment()
    .subtract(Math.ceil(Math.random() * 1000), 'day');

  let completed = null;
  if (accepted) {
    completed = Math.random() > 0.9 ? null : accepted.clone()
      .subtract(Math.ceil(Math.random() * 10), 'day').format(moment.defaultFormatUtc);
  } else {
    completed = null;
  }

  return {
    'clientName': namor.generate({ words: 2, numbers: 0}),
    'clientPhone': Math.ceil(Math.random() * 10000000).toString(),
    'clientEmail': `${namor.generate({ words: 1, numbers: 0})}@mail.com`,
    'acceptedAt': accepted ? accepted.format(moment.defaultFormatUtc) : null,
    'completedAt': completed,
    'description': namor.generate({ words: 4, numbers: 0})
  };
};

export function makeData(len = 5000) {
  return range(len).map(d => Order());
}
