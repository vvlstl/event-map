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
            'id'      => $this->id,
            'rawText' => $this->raw_text,
        ];
    }
}
