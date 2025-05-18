<?php

namespace App\Swagger\Http\Requests;

/**
 * @OA\Schema(
 *     @OA\Property(
 *         property="url",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="text",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="sourceName",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="sourceUrl",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="datetime",
 *         type="string",
 *         example="1970-01-01T00:00:00.000Z",
 *     ),
 * )
 */
class SaveRawEventRequest
{
}
