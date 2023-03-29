<template>
	<b-container>
		<b-row>
			<b-col cols="2" class="ml-auto text-right">
				<b-button block size="lg" variant="primary" class="mt-5 mb-3" @click="$bvModal.show('add-modal')"
					>Add</b-button
				>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols="12">
				<b-table striped hover bordered :items="items" :fields="fields" sort-icon-left show-empty>
					<template #cell(actions)="{ item }">
						<b-button variant="warning" @click="openEditModal(item, $event.target)">Edit</b-button>
						<b-button variant="danger" @click="openDeleteModal(item, $event.target)">Delete</b-button>
					</template>
					<template #empty="scope">
						<span class="d-flex align-items-center justify-content-center">No records to show</span>
					</template>
				</b-table>
			</b-col>
		</b-row>
		<b-modal id="edit-modal" title="Edit" centered @ok="handleEditSubmit">
			<b-form>
				<b-form-group label="Name" label-for="name-input">
					<b-form-input id="name-input" v-model="editedValue.name" type="text" required></b-form-input>
				</b-form-group>
				<b-form-group label="Order" label-for="order-input">
					<b-form-input id="order-input" v-model="editedValue.order" type="number" required></b-form-input>
				</b-form-group>
			</b-form>
		</b-modal>
		<b-modal id="add-modal" title="Add" centered @ok="handleAddSubmit">
			<b-form>
				<b-form-group label="Name" label-for="name-input">
					<b-form-input id="name-input" v-model="addValue.name" type="text" required></b-form-input>
				</b-form-group>
			</b-form>
		</b-modal>
		<b-modal id="delete-modal" hide-footer centered title="Delete">
			<div class="d-flex align-items-center justify-content-center flex-column">
				<h4 class="mb-3">Are you sure you want to delete?</h4>
				<b-button variant="danger" size="lg" block @click="handleDeleteSubmit">Yes, delete it!</b-button>
			</div>
		</b-modal>
	</b-container>
</template>

<script>
export default {
	async asyncData({ $axios }) {
		const { entities = [], pagination = [] } = await $axios.get('house_rules').then(res => res.data.data)

		return { items: entities, pagination: pagination }
	},
	data() {
		return {
			fields: [
				{ key: 'id', sortable: true, tdClass: 'align-middle' },
				{ key: 'name', sortable: true, editable: true, tdClass: 'align-middle' },
				{ key: 'order', sortable: true, editable: true, tdClass: 'align-middle' },
				{ key: 'actions', tdClass: 'align-middle' },
			],
			editedValue: {
				id: null,
				name: '',
				order: 0,
			},
			addValue: {
				name: '',
			},
			deleteValue: {
				id: null,
			},
		}
	},
	methods: {
		async handleDeleteSubmit() {
			try {
				const { message } = await this.$axios.delete(`house_rules/${this.deleteValue.id}`).then(res => res.data)

				this.items = this.items.filter(item => item.id !== this.deleteValue.id)

				this.$toast.success(message)

				this.$nextTick(() => {
					this.$bvModal.hide('delete-modal')
				})
			} catch (error) {
				console.error('error handleDeleteSubmit => ', error)
				this.$toast.error('a error ocrrured while deleting the values')
			}
		},
		async handleAddSubmit() {
			try {
				const { data, message } = await this.$axios
					.post('house_rules', {
						house_rules: {
							name: this.addValue.name,
							order: this.items.length + 1,
							active: 1,
						},
					})
					.then(res => res.data)

				this.items = [...this.items, data]

				this.$toast.success(message)

				this.$nextTick(() => {
					this.$bvModal.hide('add-modal')

					this.addValue = {
						name: '',
						order: 0,
					}
				})
			} catch (error) {
				console.error('error handleAddSubmit => ', error)
				this.$toast.error('a error ocrrured while insert the values')
			}
		},
		async handleEditSubmit() {
			try {
				const { data, message } = await this.$axios
					.put(`house_rules/${this.editedValue.id}`, {
						house_rules: {
							name: this.editedValue.name,
							active: 1,
							order: this.editedValue.order,
						},
					})
					.then(res => res.data)

				this.items = this.items.map(item => (item.id === this.editedValue.id ? data : item))

				this.$toast.success(message)

				this.$nextTick(() => {
					this.$bvModal.hide('edit-modal')

					this.editedValue = {
						id: null,
						name: '',
					}
				})
			} catch (error) {
				console.error('error handleEditSubmit => ', error)
				this.$toast.error('a error ocrrured while editing the values')
			}
		},
		openEditModal(item, button) {
			this.editedValue.id = item.id
			this.editedValue.name = item.name
			this.editedValue.order = item.order
			this.$bvModal.show('edit-modal', button)
		},
		openDeleteModal(item, button) {
			this.deleteValue.id = item.id
			this.$bvModal.show('delete-modal', button)
		},
	},
	middleware: ['authenticateUser'],
	layout: 'authenticated',
}
</script>
