<?php

namespace App\Http\Resources;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Event */
class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'address'     => $this->address,
            'lat'         => $this->latitude,
            'lng'         => $this->longitude,
            'url'         => $this->rawEvent->url,
            'previewText' => $this->preview_text,
            'detailText'  => $this->detail_text,
            'datetime'    => $this->datetime->toString(),
            'label'       => [
                'text'  => $this->category->name,
                'code'  => $this->category->code,
                'color' => $this->category->color,
            ]
        ];
    }
}
