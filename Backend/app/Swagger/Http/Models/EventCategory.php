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

    /**
     * @OA\Property(
     *     title="code",
     * )
     */
    protected string $code;

    /**
     * @OA\Property(
     *     title="color",
     * )
     */
    protected string $color;

    /**
     * @OA\Property(
     *     title="tags",
     * )
     */
    protected string $tags;
}
