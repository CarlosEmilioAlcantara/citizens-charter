export default function refreshList({
  handlePaging, 
  route, 
  currentPage,
  setCurrentPage,
  search,
  pageSize,
  ordering,
  field,
  filter,
  timeout = 300,
}) {
  setTimeout( async () => {
    let status;
    status = await handlePaging(
      `${route}?page=${currentPage}&search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`
    );
    if (!status) {
      status = await handlePaging(
        `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`
      );

      if (!status) {
        handlePaging(
          `${route}?search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`
        );
      } else {
        handlePaging(
          `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`
        );
        setCurrentPage(currentPage - 1);
      }
    }
  }, timeout);
}