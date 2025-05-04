<template>
	<PopupWrapper
		:name="'event-popup'"
	>
		Я кастомный компонент. <br>
		У меня есть кнопка <br>

		<button class="btn" @click.prevent="click">Нажми!</button>
	</PopupWrapper>

</template>
<script setup lang="ts">
	import PopupWrapper from "~/js/components/popup/PopupWrapper.vue";
</script>

