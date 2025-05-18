<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveRawEventRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'url'        => ['required'],
            'text'       => ['required'],
            'sourceName' => ['required'],
            'sourceUrl'  => ['required'],
            'datetime'   => ['required', 'date'],
        ];
    }
}
