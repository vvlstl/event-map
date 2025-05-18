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
     *     title="id",
     * )
     */
    protected int $id;

    /**
     * @OA\Property(
     *     title="url",
     * )
     */
    protected string $url;

    /**
     * @OA\Property(
     *     title="datetime",
     * )
     */
    protected string $datetime;

    /**
     * @OA\Property(
     *     title="sourceName",
     * )
     */
    protected string $sourceName;

    /**
     * @OA\Property(
     *     title="sourceUrl",
     * )
     */
    protected string $sourceUrl;
}
