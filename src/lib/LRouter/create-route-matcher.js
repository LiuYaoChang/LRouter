
export function createRouteMatcher (routes, oldPathList, oldPathMap, oldNameMap) {
  const pathList = oldPathList || []

  const pathMap = oldPathMap || Object.create(null)

  const nameMap = oldNameMap || Object.create(null)

  routes.forEach(route => {
    addRouter(pathList, pathMap, nameMap, route)
  })

  function addRouter (pathList, pathMap, nameMap, route, parent) {
    if (!pathMap[route.path]) {
      pathList.push(route.path)

      pathMap[route.path] = route
    }
    const name = route.name
    if (name && !nameMap[route.name]) {
      nameMap[name] = route
    }
  }

  return { pathList, pathMap, nameMap }
}
