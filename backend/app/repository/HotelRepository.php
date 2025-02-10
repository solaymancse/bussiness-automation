<?php

namespace App\Repository;

use App\Models\Hotel;

class HotelRepository
{
    public function index()
    {
        return Hotel::latest()->paginate(8);
    }
    public function findById($id)
    {
        return Hotel::findOrFail($id);
    }

    public function store($data)
    {
        return Hotel::create($data);
    }
    public function update($id, $data)
    {
        $hotel = $this->findById($id);
        return $hotel->update($data);
    }

    public function delete($id)
    {
        $hotel = $this->findById($id);
        return $hotel->delete();
    }
}
