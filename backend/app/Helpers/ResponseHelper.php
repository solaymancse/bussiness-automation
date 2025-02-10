<?php

if (!function_exists('successResponse')) {
    /**
     * Return a success response.
     *
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    function successResponse($data = null, $message = 'Operation successful', $statusCode = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }
}

if (!function_exists('errorResponse')) {
    /**
     * Return an error response.
     *
     * @param string $message
     * @param array|null $errors
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    function errorResponse($message = 'An error occurred', $errors = null, $statusCode = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $statusCode);
    }
}
