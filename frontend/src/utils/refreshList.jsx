export default function refreshList({
  handlePaging, 
  acessToken,
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
      `${route}?page=${currentPage}&search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`,
      acessToken
    );
    if (!status) {
      status = await handlePaging(
        `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`,
        acessToken
      );

      if (!status) {
        handlePaging(
          `${route}?search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`,
          acessToken
        );
      } else {
        handlePaging(
          `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`,
          acessToken
        );
        setCurrentPage(currentPage - 1);
      }
    }
  }, timeout);
}