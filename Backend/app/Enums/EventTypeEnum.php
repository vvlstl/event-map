<?php

namespace App\Enums;

enum EventTypeEnum: string
{
    case NEWS = 'news';
    case EVENT = 'event';
    case OTHER = 'other';

    public static function getList(): array
    {
        return array_column(self::cases(), 'value');
    }
}
