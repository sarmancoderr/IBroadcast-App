// import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'ibroadcastapp',
    paths: ['auth']
  })(store)
}

function createPersistedState({key, paths}) {
  return (store ) => {}
}
