<?php

namespace App\Swagger\Http\Controllers;

class RawEventController
{
    /**
     * Получить данные сырого события
     *
     * @OA\Get(
     *     path="/api/event/raw/{id}",
     *     tags={"Сырые события"},
     *
     *     @OA\Parameter(
     *         name="id",
     *         description="ID сырого события",
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
     *                         ref="#/components/schemas/RawEvent",
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
     * Сохранить сырые данные о событии
     *
     * @OA\Post(
     *     path="/api/event/raw/save",
     *     tags={"Сырые события"},
     *
     *     @OA\RequestBody(
     *         description="Данные сырого события",
     *         @OA\JsonContent(ref="#/components/schemas/SaveRawEventRequest"),
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
}
