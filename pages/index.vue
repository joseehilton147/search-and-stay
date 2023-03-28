<template>
	<div>Index</div>
</template>

<script>
export default {
	middleware: ['authenticateUser'],
	layout: 'authenticated',
}
</script>
