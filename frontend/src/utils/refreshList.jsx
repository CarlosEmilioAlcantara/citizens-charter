export default function refreshList({
  handlePaging, 
  route, 
  currentPage,
  setCurrentPage,
  timeout,
}) {
  setTimeout( async () => {
    const status = await handlePaging(`${route}?page=${currentPage}`);
    if (!status) {
      handlePaging(`${route}?page=${currentPage - 1}`);
      setCurrentPage(currentPage - 1);
    }
  }, timeout);
}