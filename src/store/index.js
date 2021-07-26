import { createStore } from 'vuex'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'

const modulesFiles = import.meta.globEager('./modules/*.js')
const pathList = []

for (const path in modulesFiles) {
  pathList.push(path)
}

const modules = pathList.reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})

const store = createStore({
  modules,
  getters,
  plugins: [createPersistedState({
    key: window._BASE_CONFIG.projectKey,
    reducer(state) {
      return {
        user: state.user
      }
    }
  })]
})

export default store
