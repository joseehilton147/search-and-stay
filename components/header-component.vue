<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand to="/">Search and Stay</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown right>
						<template #button-content>
							<em>{{ user.name }}</em>
						</template>

						<b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {
	methods: {
		logout() {
			this.$store.dispatch('auth/logout')
		},
	},
	computed: {
		user: function () {
			return this.$store.state.auth.user
		},
	},
}
</script>
