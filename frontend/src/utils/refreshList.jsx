export default function refreshList({
  handlePaging, 
  route, 
  currentPage,
  setCurrentPage,
  search,
  pageSize,
  order,
  timeout,
}) {
  setTimeout( async () => {
    let status;
    status = await handlePaging(
      `${route}?page=${currentPage}&search=${search}&page_size=${pageSize}&ordering=${order}`
    );
    if (!status) {
      status = await handlePaging(
        `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}&ordering=${order}`
      );

      if (!status) {
        handlePaging(
          `${route}?search=${search}&page_size=${pageSize}&ordering=${order}`
        );
      } else {
        handlePaging(
          `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}&ordering=${order}`
        );
        setCurrentPage(currentPage - 1);
      }
    }
  }, timeout);
}