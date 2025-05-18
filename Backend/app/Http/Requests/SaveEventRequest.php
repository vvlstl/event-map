<?php

namespace App\Http\Requests;

use App\Enums\EventTypeEnum;
use App\Models\EventCategory;
use App\Models\RawEvent;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveEventRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title'       => ['required'],
            'address'     => ['required'],
            'datetime'    => ['date'],
            'previewText' => ['required'],
            'detailText'  => ['required'],
            'tags'        => ['array'],
            'categoryId'  => ['required', Rule::exists(EventCategory::class, 'id')],
            'rawEventId'  => ['required', Rule::exists(RawEvent::class, 'id')],
        ];
    }
}
