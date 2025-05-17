<?php

namespace App\Swagger\Http\Models;


/**
 * API response
 *
 * @OA\Schema(
 *     title="Стандартный ответ API",
 * )
 */
class ApiResponse
{
    /**
     * @OA\Property(
     *     title="Успешно",
     *     description="Флаг успешности выполнения запроса",
     * )
     */
    protected bool $success;

    /**
     * @OA\Property(
     *     title="Сообщение",
     *     description="Сообщение в ответе",
     *     type="object",
     *     @OA\Property(
     *         property="title",
     *         title="Заголовок сообщения",
     *         description="Заголовок сообщения",
     *         type="string",
     *     ),
     *     @OA\Property(
     *         property="text",
     *         title="Текст сообщения",
     *         description="Текст сообщения",
     *         type="string",
     *     ),
     * )
     */
    protected array $message;

    /**
     * @OA\Property(
     *     title="Возвращаемые данные",
     *     description="Возвращаемые данные. Формат зависит от запроса",
     *     nullable=true,
     * )
     */
    protected mixed $data;
}
