import dhRequest from '../../../index'

export function postUsersListData(param: object) {
  return dhRequest.post({
    url: '/users/list',
    data: param
  })
}
export function fecthUserById(id: number) {
  return dhRequest.get({
    url: `users/${id}`
  })
}
export function deleteUserById(ids: Array<any>) {
  return dhRequest.delete({
    url: `users/`,
    data: ids
  })
}
export function fecthRoleList(data: object) {
  return dhRequest.post({
    url: '/role/list',
    data: data
  })
}
export function fecthDepartmentList(data: object) {
  return dhRequest.post({
    url: '/department/list',
    data: data
  })
}
export function saveUser(data: object) {
  return dhRequest.post({
    url: '/users',
    data: data
  })
}
export function editUser(id: number, data: object) {
  return dhRequest.patch({
    url: `/users/${id}`,
    data: data
  })
}
