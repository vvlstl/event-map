import {getJson, postJson} from '~/js/helper/ajax';
import {BackendApiUrl} from '~/js/.config';

export function api() {
    function getEventList(query: string = '', categoryId: number = 0) {
        const searchParams = new URLSearchParams();

        if (query) {
            searchParams.set('query', query);
        }

        if (categoryId) {
            searchParams.set('categoryId', categoryId.toString());
        }

        const queryString = searchParams.toString();
        let method = 'event/list';

        if (queryString) {
            method += '?' + queryString;
        }

        return sendRequest(method);
    }

    function getCategoryList() {
        return sendRequest('category/extended-list');
    }

    function sendRequest(apiMethod: string, data: any = null, httpMethod: 'get' | 'post' = 'get') {
        let url = BackendApiUrl + apiMethod;

        if (httpMethod === 'get') {
            if (data) {
                url += '?' + new URLSearchParams(data).toString();
            }

            return getJson(url);
        } else {
            return postJson(url, data);
        }
    }

    return {
        getEventList,
        getCategoryList,
    }
}
