const generateResponse = (
  status,
  message,
  result,
  page,
  page_size,
  totalCount
) => {
  return {
    data: result.rows,
    page: page,
    pageSize: page_size,
    hasNextPage: page * page_size < result.rowCount,
    hasPreviousPage: page > 1,
    totalCount: Number(totalCount),
    totalPages: Math.ceil(totalCount / page_size),
    status: status,
    message: message,
  };
};

module.exports = {
  generateResponse,
};
