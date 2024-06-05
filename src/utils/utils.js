export const getPaginationProperties = (response) => {
  return {
    page: Number(response.headers.page),
    per_page: Number(response.headers.per_page),
    total_rows: Number(response.headers.total_rows)
  }
}
