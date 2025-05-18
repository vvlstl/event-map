<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterEventListRequest;
use App\Http\Requests\SaveEventRequest;
use App\Http\Resources\EventCategoryResource;
use App\Http\Resources\EventResource;
use App\Http\Responses\ApiResponse;
use App\Models\Event;
use App\Models\EventCategory;
use App\Services\DaDataService;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Carbon;

class EventController extends Controller
{
    public function detail(Event $event): Responsable
    {
        return new ApiResponse(new EventResource($event));
    }

    public function categoryList(): Responsable
    {
        return new ApiResponse(EventCategoryResource::collection(EventCategory::all()));
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

    public function list(FilterEventListRequest $request): Responsable
    {
        $filter = $request->post('filter');
        $query = Event::query();

        if ($filter) {
            if (!empty($filter['query'])) {
                $queryString = (string)$filter['query'];

                $query->where('title', 'like', '%' . $queryString . '%')
                    ->orWhere('address', 'like', '%' . $queryString . '%')
                    ->orWhere('preview_text', 'like', '%' . $queryString . '%')
                    ->orWhere('detail_text', 'like', '%' . $queryString . '%');
            }

            if (!empty($filter['categoryIds'])) {
                $query->whereIn('category_id', $filter['categoryIds']);
            }
        }

        $list = $query->get();
        $list = EventResource::collection($list);

        return new ApiResponse($list);
    }
}
