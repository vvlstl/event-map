<?php

namespace App\Swagger\Http\Models;

/**
 * Событие
 *
 * @OA\Schema(
 *     title="Событие",
 * )
 */
class Event
{
    /**
     * @OA\Property(
     *     title="ID",
     * )
     */
    protected int $id;

    /**
     * @OA\Property(
     *     title="Заголовок",
     * )
     */
    protected string $title;

    /**
     * @OA\Property(
     *     title="Адрес",
     * )
     */
    protected string $address;

    /**
     * @OA\Property(
     *     title="Широта",
     * )
     */
    protected float $latitude;

    /**
     * @OA\Property(
     *     title="Долгота",
     * )
     */
    protected float $longitude;

    /**
     * @OA\Property(
     *     title="Ссылка",
     * )
     */
    protected string $url;

    /**
     * @OA\Property(
     *     title="Короткое описание",
     * )
     */
    protected string $previewText;

    /**
     * @OA\Property(
     *     title="Детальное описание",
     * )
     */
    protected string $detailText;

    /**
     * @OA\Property(
     *     title="Дата и время",
     * )
     */
    protected string $datetime;
}
