<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 *
 * @method static \Database\Factories\RawEventFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RawEvent withoutTrashed()
 * @mixin \Eloquent
 */
class RawEvent extends Model
{
    use HasFactory, SoftDeletes;
}
