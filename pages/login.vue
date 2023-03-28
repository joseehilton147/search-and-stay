<template>
	<b-container fluid>
		<b-row class="align-items-center min-vh-100">
			<b-col cols="8" offset="2">
				<b-card class="shadow-sm">
					<b-form @submit="onSubmit">
						<b-form-group label="Email:" label-for="email" description="task@searchandstay.com">
							<b-input-group>
								<b-input-group-prepend is-text>
									<b-icon-person></b-icon-person>
								</b-input-group-prepend>
								<b-form-input
									id="email"
									v-model="login.email"
									type="email"
									placeholder="Enter your email"
									size="lg"
									required
								></b-form-input>
							</b-input-group>
						</b-form-group>

						<b-form-group label="Passowrd:" label-for="password" description="ph37i45K">
							<b-input-group>
								<b-input-group-prepend is-text>
									<b-icon-lock></b-icon-lock>
								</b-input-group-prepend>
								<b-form-input
									id="password"
									type="password"
									v-model="login.password"
									placeholder="Enter your password"
									size="lg"
									required
								></b-form-input>
							</b-input-group>
						</b-form-group>
						<b-button block size="lg" type="submit" variant="primary">
							<div class="d-flex align-items-center justify-content-center">
								<span class="spinner-border spinner-border-sm mr-2" v-if="display.loading"></span>
								<span v-else>Login</span>
							</div>
						</b-button>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			login: {
				email: '',
				password: '',
			},
			user: null,
			display: {
				loading: false,
			},
		}
	},
	methods: {
		async onSubmit(event) {
			event.preventDefault()
			this.display.loading = true

			try {
				const { data } = await this.$axios.$post(
					'https://sys-dev.searchandstay.com/api/admin/login_json',
					JSON.stringify({
						login: {
							email: this.login.email,
							password: this.login.password,
						},
					})
				)

				this.user = {
					accessToken: data.result.access_token,
					name: data.result.name,
				}

				this.$toast.success('Login success')
			} catch (error) {
				this.login = {
					email: '',
					password: '',
				}

				console.error('onSubmit => ', error)

				this.$toast.error('Login failed')
			}

			this.display.loading = false
		},
	},
}
</script>
