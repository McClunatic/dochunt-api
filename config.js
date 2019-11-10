module.exports = {
  secret: "dot torte",
  lda_api: "http://localhost:8082",
  dbpath: "C:\\Users\\brian\\Workspace\\ringer-scraping\\the-ringer-2019-11-07.db",
  columns: [
    "index",
    "id",
    "href",
    "title",
    "subtitle",
    "image",
    "tags",
    "category",
    "author",
    "date",
    "content"
  ],
  fields: [
    {
      col: 0,
      key: "id",
      tagKey: "image",
      label: "Number",
      sortable: true,
      thStyle: "width: 12%"
    },
    {
      col: 1,
      tagKey: "href",
      key: "title",
      label: "Title",
      sortable: true,
      thStyle: "width: 50%"
    },
    {
      col: 2,
      key: "category",
      label: "Category",
      sortable: true,
      thStyle: "width: 15%"
    },
    {
      col: 3,
      key: "author",
      label: "Author",
      sortable: true,
      thStyle: "width: 11%"
    },
    {
      col: 4,
      key: "date",
      label: "Date",
      sortable: true,
      thStyle: "width: 1%; white-space: nowrap"
    }
  ]
}