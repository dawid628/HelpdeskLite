<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Services\LLMTriageService;
use App\Services\TicketService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * @param TicketService $ticketService
     * @param LLMTriageService $triageService
     */
    public function __construct(
        private readonly TicketService $ticketService,
        private readonly LLMTriageService $triageService
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
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdateTicketRequest $request, string $id): JsonResponse
    {
        try {
            $ticket = $this->ticketService->updateTicketStatus((int)$id, $request->validated());

            return response()->json([
                'status' => 'success',
                'data' => $ticket
            ]);
        } catch (AuthorizationException $e) {
            return response()->json(['error' => $e->getMessage()], 403);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }
    }

    /**
     * Delete ticket
     * Only admins can delete
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $this->ticketService->deleteTicket((int)$id);

            return response()->json([
                'status' => 'success',
                'message' => 'Ticket deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    /**
     * Get AI-powered triage suggestion for a ticket
     *
     * @param string $id
     * @return JsonResponse
     */
    public function triageSuggest(string $id): JsonResponse
    {
        try {
            $ticket = $this->ticketService->getTicket((int)$id);

            $suggestion = $this->triageService->suggestTriage($ticket);

            return response()->json([
                'status' => 'success',
                'data' => $suggestion->toArray()
            ]);
        } catch (AuthorizationException $e) {
            return response()->json(['error' => $e->getMessage()], 403);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ticket not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to generate triage suggestion'], 500);
        }
    }
}
