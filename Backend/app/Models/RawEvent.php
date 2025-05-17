<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 *
 * @property int $id
 * @property string $url
 * @property string|null $raw_text
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Database\Factories\RawEventFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent whereRawText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent withoutTrashed()
 * @mixin \Eloquent
 */
class RawEvent extends Model
{
    use HasFactory, SoftDeletes;
}
