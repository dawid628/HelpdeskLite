<?php

namespace Database\Seeders;

use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->count() < 2) {
            $this->command->warn('Potrzebujesz przynajmniej 2 użytkowników w bazie. Uruchom UserSeeder najpierw.');
            return;
        }

        $tickets = [
            [
                'title' => 'Błąd logowania w aplikacji mobilnej',
                'description' => 'Użytkownicy zgłaszają problemy z logowaniem do aplikacji na iOS. Po wprowadzeniu prawidłowych danych aplikacja wyrzuca błąd 500.',
                'priority' => PriorityEnum::HIGH,
                'status' => StatusEnum::OPEN,
                'tags' => ['bug', 'mobile', 'ios', 'urgent'],
            ],
            [
                'title' => 'Dodać dark mode do panelu administracyjnego',
                'description' => 'Wielu użytkowników prosi o możliwość przełączenia się na ciemny motyw w panelu admina.',
                'priority' => PriorityEnum::LOW,
                'status' => StatusEnum::OPEN,
                'tags' => ['feature', 'ui', 'enhancement'],
            ],
            [
                'title' => 'Optymalizacja zapytań SQL w module raportów',
                'description' => 'Raporty ładują się bardzo wolno. Niektóre zapytania trwają ponad 10 sekund. Wymaga optymalizacji indeksów i refaktoryzacji queries.',
                'priority' => PriorityEnum::HIGH,
                'status' => StatusEnum::IN_PROGRESS,
                'tags' => ['performance', 'database', 'optimization'],
            ],
            [
                'title' => 'Integracja z systemem płatności Stripe',
                'description' => 'Klient potrzebuje możliwości przyjmowania płatności przez Stripe. Wymagana pełna integracja z webhook\'ami i obsługą subskrypcji.',
                'priority' => PriorityEnum::MEDIUM,
                'status' => StatusEnum::IN_PROGRESS,
                'tags' => ['feature', 'payment', 'integration', 'stripe'],
            ],
            [
                'title' => 'Naprawić responsive design na tabletach',
                'description' => 'Layout strony głównej się rozjeżdża na iPadzie w orientacji poziomej. Elementy nachodzą na siebie.',
                'priority' => PriorityEnum::MEDIUM,
                'status' => StatusEnum::OPEN,
                'tags' => ['bug', 'responsive', 'css', 'tablet'],
            ],
            [
                'title' => 'Eksport danych do CSV nie działa',
                'description' => 'Funkcja eksportu raportów do CSV zwraca pusty plik. Problem dotyczy tylko raportów z ponad 1000 rekordów.',
                'priority' => PriorityEnum::HIGH,
                'status' => StatusEnum::CLOSED,
                'tags' => ['bug', 'export', 'csv', 'fixed'],
            ],
            [
                'title' => 'Aktualizacja dokumentacji API',
                'description' => 'Dokumentacja API jest przestarzała i nie zawiera nowych endpointów dodanych w ostatnich 3 miesiącach. Trzeba zaktualizować Swagger.',
                'priority' => PriorityEnum::LOW,
                'status' => StatusEnum::OPEN,
                'tags' => ['documentation', 'api', 'swagger'],
            ],
            [
                'title' => 'Dodać powiadomienia email o nowych komentarzach',
                'description' => 'Użytkownicy chcą otrzymywać emaile gdy ktoś skomentuje ich ticket. Wymaga konfiguracji kolejki i szablonów email.',
                'priority' => PriorityEnum::MEDIUM,
                'status' => StatusEnum::IN_PROGRESS,
                'tags' => ['feature', 'notifications', 'email'],
            ],
            [
                'title' => 'Błąd 404 po aktualizacji Laravel do wersji 11',
                'description' => 'Po update do Laravel 11 niektóre routy zwracają 404. Problem z konfiguracją middleware i RouteServiceProvider.',
                'priority' => PriorityEnum::CRITICAL,
                'status' => StatusEnum::CLOSED,
                'tags' => ['bug', 'critical', 'laravel', 'upgrade', 'fixed'],
            ],
            [
                'title' => 'Implementacja wyszukiwania full-text',
                'description' => 'Obecne wyszukiwanie jest bardzo podstawowe. Potrzebujemy full-text search z obsługą polskich znaków i sortowaniem po relevance. Rozważyć Scout + Meilisearch.',
                'priority' => PriorityEnum::MEDIUM,
                'status' => StatusEnum::OPEN,
                'tags' => ['feature', 'search', 'scout', 'meilisearch'],
            ],
        ];

        foreach ($tickets as $ticketData) {
            Ticket::create([
                'title' => $ticketData['title'],
                'description' => $ticketData['description'],
                'priority' => $ticketData['priority'],
                'status' => $ticketData['status'],
                'assignee_id' => $users->random()->id,
                'reporter_id' => $users->random()->id,
                'tags' => $ticketData['tags'],
            ]);
        }

        $this->command->info('Utworzono 10 ticketów pomyślnie!');
    }
}
