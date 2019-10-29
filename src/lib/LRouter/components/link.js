export default {
  name: 'LRouterLink',

  props: {
    to: {
      type: [String, Object],
      default: '/'
    },
    tag: {
      type: String,
      default: 'a'
    }
  },

  render (h) {
    const data = {}
    data.attrs = { href: '#' + this.to }
    return h(this.tag, data, this.$slots.default)
  }
}
