export default function refreshList({
  handlePaging, 
  route, 
  currentPage,
  setCurrentPage,
  search,
  pageSize,
  timeout,
}) {
  setTimeout( async () => {
    let status;
    status = await handlePaging(
      `${route}?page=${currentPage}&search=${search}&page_size=${pageSize}`
    );
    if (!status) {
      status = await handlePaging(
        `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}`
      );

      if (!status) {
        handlePaging(`${route}?search=${search}&page_size=${pageSize}`);
      } else {
        handlePaging(
          `${route}?page=${currentPage - 1}&search=${search}&page_size=${pageSize}`
        );
        setCurrentPage(currentPage - 1);
      }
    }
  }, timeout);
}