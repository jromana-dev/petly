const isValidDateOnly = (value) => {
  if (typeof value !== 'string') {
    return false;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

const dateOnlyToDate = (value) => {
  if (!value) {
    return null;
  }

  if (!isValidDateOnly(value)) {
    throw new Error(`Invalid date: ${value}`);
  }

  const [year, month, day] = value.split('-').map(Number);

  return new Date(Date.UTC(year, month - 1, day));
};

module.exports = {
  isValidDateOnly,
  dateOnlyToDate,
};