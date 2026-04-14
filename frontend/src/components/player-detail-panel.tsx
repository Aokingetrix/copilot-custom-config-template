import { CalendarClock, PencilLine, PlusCircle, ShieldCheck, Sword, UserCheck } from 'lucide-react';
import type { PlayerDetail } from '../lib/types';

interface PlayerDetailPanelProps {
  player: PlayerDetail | undefined;
  editName: string;
  onEditNameChange: (value: string) => void;
  onSave: () => void;
  onLogin: () => void;
  savePending: boolean;
  loginPending: boolean;
}

function formatDateTime(value: string | null): string {
  if (!value) {
    return '未ログイン';
  }

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function PlayerDetailPanel({
  player,
  editName,
  onEditNameChange,
  onSave,
  onLogin,
  savePending,
  loginPending,
}: PlayerDetailPanelProps) {
  if (!player) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
        <div className="flex h-full min-h-[420px] flex-col items-start justify-center gap-4 rounded-[1.5rem] border border-dashed border-white/10 bg-slate-950/30 p-8 text-slate-300">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-100">
            <ShieldCheck className="h-3.5 w-3.5" />
            Dashboard Ready
          </div>
          <h2 className="text-3xl font-bold text-slate-50">プレイヤーを選ぶと詳細が表示されます</h2>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            一覧からプレイヤーを選択すると、最新ログイン、所持キャラ、プレイ履歴、スコア履歴をまとめて確認できます。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
      <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-amber-950/40 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-100/70">
              <UserCheck className="h-3.5 w-3.5" />
              Player Detail
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-50">{player.name}</h2>
            <p className="mt-2 text-sm text-slate-400">Player ID #{player.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2">
              <div className="text-slate-400">Play Count</div>
              <div className="mt-1 text-lg font-semibold text-slate-50">{player.play_count}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2">
              <div className="text-slate-400">Characters</div>
              <div className="mt-1 text-lg font-semibold text-slate-50">{player.character_count}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2">
              <div className="text-slate-400">Latest Score</div>
              <div className="mt-1 text-lg font-semibold text-slate-50">{player.latest_score ?? '—'}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2">
              <div className="text-slate-400">Last Login</div>
              <div className="mt-1 text-sm font-medium text-slate-50">{formatDateTime(player.last_login_at)}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <label className="text-xs uppercase tracking-[0.24em] text-slate-400" htmlFor="player-name-input">
              Edit Name
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="player-name-input"
                value={editName}
                onChange={(event) => onEditNameChange(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-amber-300/40 focus:ring-2 focus:ring-amber-300/20"
                placeholder="New player name"
              />
              <button
                type="button"
                onClick={onSave}
                disabled={savePending}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-wait disabled:opacity-60"
              >
                <PencilLine className="h-4 w-4" />
                {savePending ? 'Saving...' : 'Save'}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <button
                type="button"
                onClick={onLogin}
                disabled={loginPending}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 font-medium text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-wait disabled:opacity-60"
              >
                <CalendarClock className="h-4 w-4" />
                {loginPending ? 'Logging in...' : 'Login now'}
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-400">
                <PlusCircle className="h-4 w-4" />
                登録済みキャラ {player.characters.length}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
              <Sword className="h-4 w-4 text-amber-200" />
              Owned Characters
            </h3>
            <div className="mt-4 space-y-3">
              {player.characters.length > 0 ? (
                player.characters.map((character) => (
                  <div key={character.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    <div className="font-semibold text-slate-50">{character.character_name ?? 'Unknown Character'}</div>
                    <div className="mt-1 text-slate-400">Master ID #{character.character_master_id}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-slate-400">
                  所持キャラはまだありません。
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Play Histories</h3>
          <div className="mt-4 space-y-3">
            {player.play_histories.length > 0 ? (
              player.play_histories.map((playHistory) => (
                <div key={playHistory.id} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-medium text-slate-50">{formatDateTime(playHistory.played_at)}</div>
                    <div className="text-sm text-slate-400">Play History #{playHistory.id}</div>
                  </div>
                  <div className="text-right text-sm text-amber-100">
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Score</div>
                    <div className="mt-1 text-lg font-bold">{playHistory.score ?? '—'}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-slate-400">
                プレイ履歴はまだありません。
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}