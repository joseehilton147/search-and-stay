export default async function ({ redirect, store, route }) {
	if (!store.state.auth.user.accessToken) {
		return redirect('/login')
	}
}
