<template>
	<div
		class="category-card"
		:style="`--category-card-bg-icon-section: ${item.color}`"
        @click="emit('click', item)"
	>
		<div class="category-card__content">
			<div class="category-card__name" v-html="item.name"/>
			<div v-if="item.tags.length" class="category-card__tags">{{ item.tags.join(" ") }}</div>
		</div>
		<div class="category-card__icon">
			<SvgSymbol :name="item.code"/>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {TCategoryCard} from "~/types/info-events/TCategoryCard";
	import SvgSymbol from "~/js/components/common/SvgSymbol.vue";

	type TComponentProps = {
		item: TCategoryCard,
	}

    const emit = defineEmits(['click']);
	const props = defineProps<TComponentProps>();
</script>

