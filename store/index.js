const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  data: {},
  token: '',
  authentication: false,
  reservation: {},
  dataRequestReservation: {}
})

export const mutations = {
  setData(state, resData) {
    state.data = resData
  },
  setToken(state, resDataToken) {
    state.token = resDataToken
  },
  setAuthentication(state, resDataAuthentication) {
    state.authentication = resDataAuthentication
  },
  setReservation(state, reserve) {
    state.reservation = reserve
  },
  setDataRequestReservation(state, data) {
    state.dataRequestReservation = data
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let authentication = null
    if(req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        authentication = parsed.authentication
      } catch (err) {
        //No valid cookie found
        console.log(err)
      }
    }
    commit('setToken', authentication)
  }
}