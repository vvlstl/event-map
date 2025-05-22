<?php

namespace App\Swagger\Http\Controllers;

class EventCategoryController
{
    /**
     * Получить список всех категорий событий
     *
     * @OA\Get(
     *     path="/api/category/list",
     *     tags={"Категории"},
     *
     *     @OA\Response(
     *         response="200",
     *         description="Результат выполнения запроса",
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/ApiResponse"),
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(
     *                         property="data",
     *                         type="array",
     *                         @OA\Items(ref="#/components/schemas/EventCategory"),
     *                     )
     *                )
     *             }
     *         ),
     *     ),
     * ),
     */
    public function list()
    {
    }
}
