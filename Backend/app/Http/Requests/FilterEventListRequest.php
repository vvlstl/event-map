<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterEventListRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'filter'             => ['array:query,categoryIds'],
            'filter.query'       => [],
            'filter.categoryIds' => ['array'],
        ];
    }
}
