import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'ibroadcastapp',
    paths: ['auth']
  })(store)
}
