<?php

namespace App\Http\Resources;

use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin EventCategory */
class ExtendedEventCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'code'  => $this->code ?? '',
            'color' => $this->color ?? '',
            'tags'  => [],
        ];
    }
}
