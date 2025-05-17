<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DaDataService
{
    protected string $apiKey = '';
    protected string $secretKey = '';

    protected const string BASE_URL = 'https://cleaner.dadata.ru/api/v1/';

    public function __construct()
    {
        $this->apiKey = config('dadata.api_key');
        $this->secretKey = config('dadata.secret_key');
    }

    /**
     * @return array{float, float}|null
     */
    public function getCoords(string $address): ?array
    {
        $data = $this->sendRequest('clean/address', [$address]);

        $lat = floatval($data[0]['geo_lat'] ?? 0);
        $lon = floatval($data[0]['geo_lat'] ?? 0);

        if (empty($lat) || empty($lon)) {
            return null;
        }

        return [$lat, $lon];
    }

    protected function sendRequest(string $method, array $data): ?array
    {
        try {
            return Http::withHeaders([
                'Accept'        => 'application/json',
                'Content-Type'  => 'application/json',
                'Authorization' => 'Token ' . $this->apiKey,
                'X-Secret'      => $this->secretKey,
            ])
                ->post(static::BASE_URL . $method, $data)
                ->json();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return null;
        }
    }
}
