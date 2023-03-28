export const state = () => ({
	user: {
		name: null,
		accessToken: null,
	},
})

export const mutations = {
	SET_USER(state, user) {
		state.user = { ...user }
	},
}

export const actions = {
	async login({ commit }, userData) {
		const { data } = await this.$axios
			.post('https://sys-dev.searchandstay.com/api/admin/login_json', userData)
			.then(res => res.data)

		commit('SET_USER', { name: data.result.name, accessToken: data.result.access_token })

		this.$router.push('/')
	},

	async logout({ commit }) {
		commit('SET_USER', {
			user: null,
		})

		window.location.reload()
	},
}
