export default {
  name: 'LRouterView',
  functional: true,

  props: {
    name: {
      type: String
    }
  },

  render (_, { data, parent, props, children }) {
    const h = parent.$createElement

    const route = parent.$route
    const component = route.component
    return h(component, data, children)
  }
}
