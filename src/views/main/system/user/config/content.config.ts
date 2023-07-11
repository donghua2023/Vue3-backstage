export const contentconfig: any = {
  tableColumns: [
    { type: 'selection', width: '55' },
    { type: 'index', label: '序号', width: '120' },
    { prop: 'name', label: '用户名', width: '180', visition: true },
    { prop: 'realname', label: '真实姓名', width: '180', visition: true },
    { prop: 'cellphone', label: '手机号码', visition: true },
    {
      prop: 'enable',
      label: '状态',
      visition: true,
      type: 'tag',
      confirmItem: 1,
      successText: '启用',
      loseText: '禁用'
    },
    { prop: 'createAt', label: '创建时间', visition: true },
    { prop: 'updateAt', label: '更新时间', visition: true },
    { type: 'handler', label: '操作', visition: true, isEdit: true, isDelete: true, width: 200 }
  ],
  isPagination: true
}
