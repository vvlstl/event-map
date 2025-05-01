<template>
	<div class="event-card">
		<img
			class="event-card__image"
			:src="item.image"
			alt="Конференция"
		>
		<div class="event-card__content">
			<div class="event-card__title" v-html="item.name"/>
			<div class="event-card__description" v-html="item.description"/>
			<div class="event-card__details">
				<span class="event-card__address" v-html="item.address"/>
				<span class="event-card__date" v-html="item.date"/>
			</div>
			<div class="event-card__tag" v-html="item.source"/>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {TEventCard} from "~/types/TEventCard";

	type TComponentProps = {
		item: TEventCard,
	}

	const props = defineProps<TComponentProps>();
</script>

