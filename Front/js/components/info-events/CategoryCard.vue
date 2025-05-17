<template>
	<div
		class="category-card"
		:class="`category-card--${item.type}`"
	>
		<div class="category-card__content">
			<div class="category-card__name" v-html="item.name"/>
			<div class="category-card__tags">{{item.tags.join(" ")}}</div>
		</div>
		<div class="category-card__icon">
			<SvgSymbol :name="item.type"/>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {TCategoryCard} from "~/types/info-events/TCategoryCard";
	import SvgSymbol from "~/js/components/common/SvgSymbol.vue";

	type TComponentProps = {
		item: TCategoryCard,
	}

	const props = defineProps<TComponentProps>();
</script>

