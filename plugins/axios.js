export default function ({ $axios, store }) {
	$axios.onRequest(config => {
		const token = store.state.auth.user.accessToken

		if (token) {
			config.headers.common['Authorization'] = `Bearer ${token}`
		}
	})
}
