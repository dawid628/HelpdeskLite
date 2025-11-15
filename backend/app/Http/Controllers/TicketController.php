<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Services\TicketService;
use http\Client\Response;
use HttpResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['status', 'priority', 'assignee_id', 'tags', 'reporter_id']);
        $tickets = $this->ticketService->getAllTickets($filters);

        return response()->json(['data' => $tickets]);
    }

    /**
     * Get single ticket
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $ticket = $this->ticketService->getTicket($id);
            return response()->json(['data' => $ticket]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
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

    /**
     * Delete ticket
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->ticketService->deleteTicket($id);

            return response()->json([
                'status' => 'success',
                'message' => 'Ticket deleted succesfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }
}
