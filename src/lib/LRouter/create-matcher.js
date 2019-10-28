import { createRouteMatcher } from './create-route-matcher'


export function createMatcher(routes) {
  const { pathList, pathMap, nameMap } = createRouteMatcher(routes)
  // 获取 匹配的路由对象
  function match(location) {
    return pathMap[location]
  }

  return { match }
}
