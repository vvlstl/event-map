<?php

namespace App\Swagger\Http\Requests;

/**
 * @OA\Schema(
 *     @OA\Property(
 *         property="filter",
 *         type="object",
 *         @OA\Property(
 *             property="query",
 *             type="string",
 *         ),
 *         @OA\Property(
 *             property="categoryIds",
 *             type="array",
 *             @OA\Items(
 *                 type="integer",
 *             ),
 *         ),
 *     ),
 * )
 */
class FilterEventListRequest
{
}
