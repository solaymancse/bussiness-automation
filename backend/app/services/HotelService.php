<?php

namespace App\Services;

use App\Repository\HotelRepository;

class HotelService
{
    public function __construct(protected HotelRepository $hotelRepository) {}

    public function index()
    {
        return $this->hotelRepository->index();
    }
    public function store($data)
    {
        $hotel = $this->hotelRepository->store($data);
        return response()->json([
            'status' => 201,
            'message' => 'Hotel created successfully',
            'data' => $hotel,
        ]);
    }
    public function update($id, $data)
    {
        $hotel = $this->hotelRepository->update($id, $data);
        return response()->json([
            'status' => 200,
            'message' => 'Hotel updated successfully',
            'data' => $hotel,
        ]);
    }

    public function delete($id)
    {
        return $this->hotelRepository->delete($id);
    }
}
