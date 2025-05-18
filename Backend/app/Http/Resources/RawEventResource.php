<?php

namespace App\Http\Resources;

use App\Models\RawEvent;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin RawEvent */
class RawEventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'url'        => $this->url,
            'datetime'   => $this->datetime->toString(),
            'sourceName' => $this->source_name,
            'sourceUrl'  => $this->source_url,
            'text'       => $this->raw_text,
        ];
    }
}
