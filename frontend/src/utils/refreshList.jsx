export default function refreshList({
  handlePaging, 
  route, 
  currentPage,
  setCurrentPage,
  search,
  pageSize,
  ordering,
  timeout = 300,
}) {
  setTimeout( async () => {
    let status;
    status = await handlePaging(
      `${route}?page=${currentPage}&search=${search}&page_size=${pageSize}&ordering=${ordering}`
    );
    if (!status) {
      status = await handlePaging(
        `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}&ordering=${ordering}`
      );

      if (!status) {
        handlePaging(
          `${route}?search=${search}&page_size=${pageSize}&ordering=${ordering}`
        );
      } else {
        handlePaging(
          `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}&ordering=${ordering}`
        );
        setCurrentPage(currentPage - 1);
      }
    }
  }, timeout);
}