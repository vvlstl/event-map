<?php

namespace App\Swagger\Http\Models;

/**
 * Событие
 *
 * @OA\Schema(
 *     title="Категория событий",
 * )
 */
class EventCategory
{
    /**
     * @OA\Property(
     *     title="ID",
     * )
     */
    protected int $id;

    /**
     * @OA\Property(
     *     title="Название",
     * )
     */
    protected string $name;
}
