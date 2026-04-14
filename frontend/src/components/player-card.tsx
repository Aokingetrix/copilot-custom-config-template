import { CalendarClock, ChevronRight, Gamepad2, Hash } from 'lucide-react';
import { cn } from '../lib/cn';
import type { PlayerSummary } from '../lib/types';

interface PlayerCardProps {
  player: PlayerSummary;
  selected: boolean;
  onSelect: (playerId: number) => void;
  onLogin: (playerId: number) => void;
  loginPending: boolean;
}

export function PlayerCard({ player, selected, onSelect, onLogin, loginPending }: PlayerCardProps) {
  const lastLoginLabel = player.last_login_at
    ? new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(player.last_login_at))
    : '未ログイン';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(player.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(player.id);
        }
      }}
      className={cn(
        'group w-full rounded-3xl border px-4 py-4 text-left transition duration-200 outline-none',
        'border-white/10 bg-white/5 hover:border-amber-300/30 hover:bg-white/10',
        selected && 'border-amber-300/40 bg-amber-300/10 shadow-glow',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-amber-200/70">
            <Gamepad2 className="h-3.5 w-3.5" />
            Player #{player.id}
          </div>
          <h3 className="mt-2 text-lg font-bold text-slate-50">{player.name}</h3>
        </div>
        <ChevronRight className={cn('h-5 w-5 transition', selected ? 'text-amber-200' : 'text-slate-500 group-hover:text-slate-300')} />
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Hash className="h-4 w-4" />
            Play Count
          </div>
          <div className="mt-1 text-xl font-semibold text-slate-50">{player.play_count}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2">
          <div className="flex items-center gap-2 text-slate-400">
            <CalendarClock className="h-4 w-4" />
            Last Login
          </div>
          <div className="mt-1 text-sm text-slate-100">{lastLoginLabel}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
        {player.character_names.length > 0 ? (
          player.character_names.map((characterName) => (
            <span key={characterName} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-100">
              {characterName}
            </span>
          ))
        ) : (
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-400">所持キャラなし</span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>{player.character_count} characters</span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onLogin(player.id);
          }}
          disabled={loginPending}
          className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/20 disabled:cursor-wait disabled:opacity-60"
        >
          {loginPending ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}