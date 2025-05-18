<?php

namespace App\Swagger\Http\Requests;

/**
 * @OA\Schema(
 *     @OA\Property(
 *         property="title",
 *         description="Заголовок",
 *         type="integer",
 *     ),
 *     @OA\Property(
 *         property="address",
 *         description="Адрес",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="datetime",
 *         description="Дата и время",
 *         type="string",
 *         example="1970-01-01T00:00:00.000Z",
 *     ),
 *     @OA\Property(
 *         property="previewText",
 *         description="Краткое описание",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="detailText",
 *         description="Детальное описание",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="tags",
 *         description="Теги",
 *         type="array",
 *         @OA\Items(
 *             type="string",
 *         ),
 *     ),
 *     @OA\Property(
 *         property="categoryId",
 *         description="ID категории",
 *         type="integer",
 *     ),
 *     @OA\Property(
 *         property="rawEventId",
 *         description="ID сырого события",
 *         type="integer",
 *     ),
 * )
 */
class SaveEventRequest
{
}
