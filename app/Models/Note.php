<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Note
 *
 * @property int $id
 * @property string $title
 * @property string $body
 * @property bool $is_archived
 * @property int $fk_id_user
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property User $user
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder|Note newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Note newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Note query()
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereFkIdUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereIsArchived($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereUpdatedAt($value)
 * @property int $is_pinned
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereIsPinned($value)
 * @mixin \Eloquent
 */
class Note extends Model
{
	protected $table = 'notes';

	protected $casts = [
		'is_archived' => 'bool',
		'fk_id_user' => 'int'
	];

	protected $fillable = [
		'title',
		'body',
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'fk_id_user');
	}
}
