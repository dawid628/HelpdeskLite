<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Services\TicketService;
use Illuminate\Http\JsonResponse;

class TicketController extends Controller
{
    /**
     * @param TicketService $ticketService
     */
    public function __construct(
        private readonly TicketService $ticketService
    ) {}

    /**
     * Get list of all tickets
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $tickets = $this->ticketService->getAllTickets();

        return response()->json(['data' => $tickets]);
    }

    /**
     * Create a new ticket
     *
     * @param StoreTicketRequest $request
     * @return JsonResponse
     */
    public function store(StoreTicketRequest $request): JsonResponse
    {
        $ticket = $this->ticketService->createTicket($request->validated());

        return response()->json([
            'status' => 'success',
            'data' => $ticket
        ], 201);
    }

    /**
     * Update ticket status
     *
     * @param UpdateTicketRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateTicketRequest $request, int $id): JsonResponse
    {
        $ticket = $this->ticketService->updateTicketStatus(
            $id,
            $request->validated()
        );

        return response()->json([
            'status' => 'success',
            'data' => $ticket
        ]);
    }
}
