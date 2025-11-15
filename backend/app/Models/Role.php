<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    protected $fillable = ['name'];

    /**
     * Users with this role
     *
     * @return HasMany
     */
    public function users(): hasMany
    {
        return $this->hasMany(User::class);
    }
}
