<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveEventRequest;
use App\Http\Resources\EventResource;
use App\Http\Responses\ApiResponse;
use App\Models\Event;
use App\Services\DaDataService;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class EventController extends Controller
{
    public function detail(Event $event): Responsable
    {
        return new ApiResponse(new EventResource($event));
    }

    public function save(SaveEventRequest $request, DaDataService $daDataService): Responsable
    {
        $address = $request->post('address');
        $coords = $daDataService->getCoords($address);

        try {
            $result = Event::make([
                'title'        => $request->post('title'),
                'address'      => $request->post('address'),
                'latitude'     => $coords[0] ?? null,
                'longitude'    => $coords[1] ?? null,
                'datetime'     => $request->post('datetime')
                    ? new Carbon($request->post('datetime'))
                    : null,
                'preview_text' => $request->post('previewText'),
                'detail_text'  => $request->post('detailText'),
                'category_id'  => $request->post('categoryId'),
                'raw_event_id' => $request->post('rawEventId'),
            ])->save();
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            $result = false;
        }

        if (!$result) {
            return (new ApiResponse())
                ->setSuccess(false)
                ->setMessage('Произошла непредвиденная ошибка');
        }

        return new ApiResponse();
    }

    public function list(Request $request): Responsable
    {
        $queryString = $request->query('query');
        $categoryId = $request->query('categoryId');
        $query = Event::query();

        if (!empty($queryString)) {
            $query->where('title', 'like', '%' . $queryString . '%')
                ->orWhere('address', 'like', '%' . $queryString . '%')
                ->orWhere('preview_text', 'like', '%' . $queryString . '%')
                ->orWhere('detail_text', 'like', '%' . $queryString . '%');
        }

        if (!empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }

        $list = $query->get();
        $list = EventResource::collection($list);

        return new ApiResponse($list);
    }
}
