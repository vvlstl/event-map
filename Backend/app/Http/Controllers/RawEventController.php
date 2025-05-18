<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveRawEventRequest;
use App\Http\Resources\RawEventResource;
use App\Http\Responses\ApiResponse;
use App\Models\RawEvent;
use Illuminate\Contracts\Queue\Queue;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class RawEventController
{
    public function detail(RawEvent $rawEvent): Responsable
    {
        return new ApiResponse(RawEventResource::make($rawEvent));
    }

    public function save(SaveRawEventRequest $request, Queue $queue): Responsable
    {
        try {
            $model = RawEvent::make([
                'url'         => $request->post('url'),
                'raw_text'    => $request->post('text'),
                'source_name' => $request->post('sourceName'),
                'source_url'  => $request->post('sourceUrl'),
                'datetime'    => new Carbon($request->post('datetime')),
            ]);

            $result = $model->save();
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            $result = false;
        }

        if (!$result) {
            return (new ApiResponse())
                ->setSuccess(false)
                ->setMessage('Произошла непредвиденная ошибка');
        }

        Log::channel('ml-worker')->info('ID сырого сообщения для парсинга ML', ['id' => $model->id]);
        $queue->pushRaw($model->id, 'news_queue');

        return new ApiResponse();
    }
}
