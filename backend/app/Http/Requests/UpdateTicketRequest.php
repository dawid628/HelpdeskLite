<?php

namespace App\Http\Requests;

use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Request for updating a ticket
 */
class UpdateTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['sometimes', 'integer', Rule::in(array_column(StatusEnum::cases(), 'value'))],
            'priority' => ['sometimes', 'integer', Rule::in(array_column(PriorityEnum::cases(), 'value'))],
            'assignee_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'tags' => ['sometimes', 'array'],
            'tags.*' => ['string', 'max:50'],
        ];
    }
}
