export default {
	head: {
		title: 'Search and Stay',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
			},
		],
	},

	css: ['~/assets/css/style.css'],

	plugins: ['~/plugins/axios'],

	components: true,

	buildModules: [],

	modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', 'vue-toastification/nuxt'],

	axios: {
		baseURL: 'https://sys-dev.searchandstay.com/api/admin',
	},

	bootstrapVue: {
		icons: true,
	},

	toast: {
		position: 'top-right',
	},

	build: {},
}
