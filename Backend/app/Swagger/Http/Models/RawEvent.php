<?php

namespace App\Swagger\Http\Models;

/**
 * @OA\Schema(
 *     title="Сырое событие",
 * )
 */
class RawEvent
{
    /**
     * @OA\Property(
     *     title="ID",
     * )
     */
    protected int $id;

    /**
     * @OA\Property(
     *     title="Оригинальный текст",
     * )
     */
    protected string $title;
}
