import dhRequest from '..'

export function postRoleList(param: any) {
  return dhRequest.post({
    url: '/role/list',
    data: param
  })
}
