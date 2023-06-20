export const contentconfig = {
  tableColumns: [
    {type: 'selection', width: "55"},
    {type: 'index', label: '序号', width: "120"},
    {prop: 'name', label: '部门名称', width: "180", visition: true},
    {prop: 'leader', label: '部门领导', width: "180", visition: true},
    {prop: 'parentId', label: '上级部门', visition: true},
    {prop: 'createAt', label: '创建时间', visition: true},
    {prop: 'updateAt', label: '更新时间', visition: true},
    {type: 'handler', label: '操作', visition: true, isEdit: true, isDelete: true, width: '200'}
  ],
  isPagination: true
}
