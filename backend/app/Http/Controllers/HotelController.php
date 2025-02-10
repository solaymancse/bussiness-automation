<?php

namespace App\Http\Controllers;

use App\Http\Requests\HotelRequest;
use App\Services\HotelService;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function __construct(protected HotelService $hotelService) {}

    public function index()
    {
        return $this->hotelService->index();
    }
    public function store(HotelRequest $request)
    {
        return $this->hotelService->store($request->all());
    }
    public function update($id, Request $request)
    {
        return $this->hotelService->update($id, $request->all());
    }

    public function destroy($id)
    {
        return $this->hotelService->delete($id);
    }
}
