<template>
	<div class="app">
		<InfoEvents
            :items="eventItems"
            class="app__info-event"
            @filter-by-category="setCategoryId"
            @query-input="setQueryString"
        />
		<Map :markers="eventItems" class="app__map"/>
	</div>
	<ModalsContainer/>
</template>
<script setup lang="ts">
	import Map from "~/js/components/Map.vue";
	import InfoEvents from "~/js/components/info-events/InfoEvents.vue";
    import {TCategoryCard} from '~/types/info-events/TCategoryCard';
    import {onMounted, ref} from 'vue';
    import {TEventCard} from '~/types/info-events/TEventCard';
    import {api} from '~/js/helper/api';

	const eventItems = ref<TEventCard[]>([]);
    const selectedCategoryId = ref(0);
    const queryString = ref('');

    function setCategoryId(category: TCategoryCard) {
        selectedCategoryId.value = selectedCategoryId.value == category.id ? 0 : category.id;
        loadEventList();
    }

    function setQueryString(value: string) {
        queryString.value = value;
        loadEventList();
    }

    async function loadEventList() {
        const response = await api().getEventList(queryString.value, selectedCategoryId.value);

        if (response.success) {
            eventItems.value = response.data;
        }
    }

    onMounted(() => {
        loadEventList();
    })
</script>
