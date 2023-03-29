<template>
	<b-container>
		<b-row>
			<b-col cols="12">
				<b-table :items="items" :fields="fields" sort-icon-left>
					<template #cell(actions)="{ item }">
						<b-button variant="primary" @click="info(item, 'Edit', $event.target)">Info</b-button>
						<b-button variant="primary" @click="doEdit(item)">Edit</b-button>
						<b-button variant="danger" @click="doDelete(item.id)">Delete</b-button>
					</template>
				</b-table>
			</b-col>
		</b-row>
		<b-modal :id="infoModal.id" :title="infoModal.title" centered @hide="resetInfoModal">
			<pre>{{ infoModal.content }}</pre>
		</b-modal>
	</b-container>
</template>

<script>
export default {
	async asyncData({ $axios }) {
		const response = await $axios.get('house_rules').then(res => res.data)

		return { items: response.data.entities, pagination: response.data.pagination }
	},
	data() {
		return {
			fields: [
				{ key: 'id', sortable: true },
				{ key: 'name', sortable: true, editable: true },
				{ key: 'active' },
				{ key: 'order', sortable: true, editable: true },
				{ key: 'actions' },
			],
			infoModal: {
				id: 'info-modal',
				title: '',
				content: '',
			},
		}
	},
	methods: {
		info(item, title, button) {
			this.infoModal.title = title
			this.infoModal.content = JSON.stringify(item, null, 2)
			this.$root.$emit('bv::show::modal', this.infoModal.id, button)
		},
		resetInfoModal() {
			this.infoModal.title = ''
			this.infoModal.content = ''
		},
		async doEdit(value) {
			try {
				const response = await this.$axios
					.put(`/house_rules/${value.id}`, {
						house_rules: {
							name: 'Update holiday new',
							active: 1,
						},
					})
					.then(res => res.data)

				this.items = this.items.map(item => (item.id === value.id ? response.data : item))

				this.$toast.success(response.message)
			} catch (error) {
				this.$toast.error(response.message)
			}
		},
		doDelete(id) {
			console.log('delete => ', id)
		},
	},
	middleware: ['authenticateUser'],
	layout: 'authenticated',
}
</script>
