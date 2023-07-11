export const contentconfig: any = {
  tableColumns: [
    { type: 'selection', width: '55' },
    { type: 'index', label: '序号', width: '120' },
    { prop: 'name', label: '角色名称', width: '180', visition: true },
    { prop: 'intro', label: '权限介绍', width: '180', visition: true },
    { prop: 'createAt', label: '创建时间', visition: true },
    { prop: 'updateAt', label: '更新时间', visition: true },
    { type: 'handler', label: '操作', visition: true, isEdit: true, isDelete: true }
  ],
  isPagination: true
}
