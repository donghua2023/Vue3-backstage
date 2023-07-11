import dhRequest from '@/service'

export function postDepartmentList(param: any) {
  return dhRequest.post({
    url: '/department/list',
    data: param
  })
}
