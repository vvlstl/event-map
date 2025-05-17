<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;

class ApiResponse implements Responsable
{
    protected bool $success = true;
    protected array $message = [];

    public function __construct(
        protected mixed $data = null,
    ) {
    }

    public function setSuccess(bool $success): static
    {
        $this->success = $success;
        return $this;
    }

    public function setMessage(?string $title = null, ?string $text = null): static
    {
        if ($title) {
            $this->message['title'] = $title;
        }

        if ($text) {
            $this->message['text'] = $text;
        }

        return $this;
    }


    public function toResponse($request)
    {
        $jsonData = [
            'success' => $this->success,
            'data'    => $this->data,
        ];

        if (!empty($this->message)) {
            $jsonData['message'] = $this->message;
        }

        return new JsonResponse($jsonData);
    }
}
