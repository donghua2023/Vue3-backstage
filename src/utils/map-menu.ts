import { RouteRecordRaw } from "vue-router";

function loadingLocalRoutes() {
  const localRoutes:RouteRecordRaw[] = []
  // 读取router/main下的所有ts文件
  const files:Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  // console.log(files, '.......')
  for(const key in files) {
    localRoutes.push(files[key].default)
  }
  return localRoutes

}
export let firstMenu:any = null
export function mapMenusToRoutes(rolelist:any[]) {
  const localRoutes = loadingLocalRoutes()
  const routes:RouteRecordRaw[] = []
  for (const role of rolelist) {
    for (const childrole of role.children) {
      const route:any = localRoutes.find((item)=> item.path === childrole.url)

      // 面包屑一级菜单需要做重定向（没有注册对应的页面）
      if(route) {
        if(!routes.find((item)=>{item.path === role.url})) {
          routes.push({path: role.url, redirect: route.path})
        }
      }
      routes.push(route)

      // 记录一下获取到的第一个值
      if(!firstMenu && route) {
        firstMenu = childrole
      }
    }
  }
  console.log(routes, '动态获取的路由');

  return routes
}

/**
 * @获取默认菜单
 */
export function mapMenuToPath(routePath:string, roleList:any[] ){
  for(const item of roleList) {
    for(const sitem of item.children) {
      if(routePath === sitem.url) {
        const id = sitem.id
        return id
      }
    }
  }
}

export function mapMenusToCrumbs( routePath:any,rolelist:any[]) {
  const roleArr = []
  for(const item of rolelist) {
    for(const sItem of item.children) {
      if(routePath === sItem.url) {
        roleArr.push({ name: item.name,url:item.url})
        roleArr.push({name: sItem.name, url:sItem.url})
      }
    }
  }
  return roleArr
}
