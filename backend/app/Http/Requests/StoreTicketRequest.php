<?php

namespace App\Http\Requests;

use App\Enums\PriorityEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Request validation for creating a new ticket
 */
class StoreTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'priority' => ['required', 'integer', Rule::in(PriorityEnum::values())],
            'assignee_id' => ['required', 'exists:users,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
        ];
    }

    /**
     * Get custom attributes for validator errors
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'ticket title',
            'description' => 'ticket description',
            'priority' => 'priority level',
            'assignee_id' => 'assignee',
            'tags' => 'tags',
            'tags.*' => 'tag',
        ];
    }

    /**
     * Get custom messages for validator errors
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The ticket title is required.',
            'title.max' => 'The ticket title must not exceed 255 characters.',
            'description.required' => 'The ticket description is required.',
            'priority.required' => 'Please select a priority level.',
            'priority.in' => 'The selected priority is invalid.',
            'assignee_id.required' => 'Please assign the ticket to a user.',
            'assignee_id.exists' => 'The selected assignee does not exist.',
            'tags.array' => 'Tags must be an array.',
            'tags.*.string' => 'Each tag must be a string.',
            'tags.*.max' => 'Each tag must not exceed 50 characters.',
        ];
    }
}
