<?php

namespace App\Swagger\Http\Controllers;

class EventController
{
    /**
     * Получить событие
     *
     * @OA\Get(
     *     path="/api/event/{id}",
     *     tags={"События"},
     *
     *     @OA\Parameter(
     *         name="id",
     *         description="ID события",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="int",
     *             example="10",
     *         )
     *     ),
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
     *                         type="object",
     *                         description="Событие",
     *                         ref="#/components/schemas/Event",
     *                     )
     *                )
     *             }
     *         ),
     *     ),
     * ),
     */
    public function detail()
    {
    }

    /**
     * Получить список всех категорий событий
     *
     * @OA\Get(
     *     path="/api/category/list",
     *     tags={"События"},
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
    public function categoryList()
    {
    }

    /**
     * Сохранить данные о событии
     *
     * @OA\Post(
     *     path="/api/event/save",
     *     tags={"События"},
     *
     *     @OA\RequestBody(
     *         description="Данные события",
     *         @OA\JsonContent(ref="#/components/schemas/SaveEventRequest"),
     *     ),
     *
     *     @OA\Response(
     *         response="200",
     *         description="Результат выполнения запроса",
     *         @OA\JsonContent(ref="#/components/schemas/ApiResponse"),
     *     ),
     * ),
     */
    public function save()
    {
    }

    /**
     * Получить список событий по фильтру
     *
     * @OA\Get(
     *     path="/api/event/list",
     *     tags={"События"},
     *
     *     @OA\RequestBody(
     *         description="Данные фильтрв",
     *         @OA\JsonContent(ref="#/components/schemas/FilterEventListRequest"),
     *     ),
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
     *                         @OA\Items(ref="#/components/schemas/Event"),
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
