import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, Crown, Flame, Loader2, RefreshCcw, Search } from 'lucide-react';
import { createPlayer, fetchPlayer, fetchPlayers, loginPlayer, updatePlayer } from './lib/api';
import type { PlayerSummary } from './lib/types';
import { cn } from './lib/cn';
import { PlayerCard } from './components/player-card';
import { PlayerDetailPanel } from './components/player-detail-panel';
import { PlayerForm } from './components/player-form';

function formatCompactDateTime(value: string | null): string {
  if (!value) {
    return '未ログイン';
  }

  return new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function App() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [editPlayerName, setEditPlayerName] = useState('');

  const playersQuery = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
  });

  const selectedPlayerQuery = useQuery({
    queryKey: ['player', selectedPlayerId],
    queryFn: () => fetchPlayer(selectedPlayerId as number),
    enabled: selectedPlayerId !== null,
  });

  useEffect(() => {
    if (selectedPlayerQuery.data) {
      setEditPlayerName(selectedPlayerQuery.data.name);
    }
  }, [selectedPlayerQuery.data]);

  const filteredPlayers = useMemo(() => {
    const players = playersQuery.data ?? [];
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return players;
    }

    return players.filter((player) => {
      const searchableText = [player.name, player.character_names.join(' '), String(player.play_count)]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedSearchTerm);
    });
  }, [playersQuery.data, searchTerm]);

  const createMutation = useMutation({
    mutationFn: (name: string) => createPlayer({ name }),
    onSuccess: async (playerDetail) => {
      setNewPlayerName('');
      setSelectedPlayerId(playerDetail.id);
      await queryClient.invalidateQueries({ queryKey: ['players'] });
      await queryClient.invalidateQueries({ queryKey: ['player', playerDetail.id] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ playerId, name }: { playerId: number; name: string }) => updatePlayer(playerId, { name }),
    onSuccess: async (playerDetail) => {
      await queryClient.invalidateQueries({ queryKey: ['players'] });
      await queryClient.invalidateQueries({ queryKey: ['player', playerDetail.id] });
    },
  });

  const loginMutation = useMutation({
    mutationFn: (playerId: number) => loginPlayer(playerId),
    onSuccess: async (playerDetail) => {
      await queryClient.invalidateQueries({ queryKey: ['players'] });
      await queryClient.invalidateQueries({ queryKey: ['player', playerDetail.id] });
    },
  });

  const selectedPlayer = selectedPlayerQuery.data;

  const totalPlayers = playersQuery.data?.length ?? 0;
  const totalCharacters = useMemo(
    () => (playersQuery.data ?? []).reduce((sum, player) => sum + player.character_count, 0),
    [playersQuery.data],
  );
  const latestLoginLabel = useMemo(() => formatCompactDateTime(selectedPlayer?.last_login_at ?? null), [selectedPlayer?.last_login_at]);

  return (
    <main className="min-h-[100dvh] overflow-x-hidden text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950/60 p-6 shadow-glow backdrop-blur sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.16),transparent_30%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.34em] text-amber-100">
                <Flame className="h-3.5 w-3.5" />
                Arcade Control Room
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                Player management, but it feels like a cabinet dashboard.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                プレイヤー一覧、詳細、編集、ログイン更新を一画面に集約した管理 UI。バックエンドのデータとプレイ履歴をそのまま確認できます。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                  <Crown className="h-4 w-4 text-amber-200" />
                  Players
                </div>
                <div className="mt-2 text-3xl font-bold text-slate-50">{totalPlayers}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                  <Search className="h-4 w-4 text-cyan-200" />
                  Visible
                </div>
                <div className="mt-2 text-3xl font-bold text-slate-50">{filteredPlayers.length}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                  <AlertTriangle className="h-4 w-4 text-lime-200" />
                  Characters
                </div>
                <div className="mt-2 text-3xl font-bold text-slate-50">{totalCharacters}</div>
              </div>
            </div>
          </div>
        </section>

        <PlayerForm
          value={newPlayerName}
          onChange={setNewPlayerName}
          onSubmit={() => {
            if (!newPlayerName.trim()) {
              return;
            }

            createMutation.mutate(newPlayerName.trim());
          }}
          pending={createMutation.isPending}
        />

        <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Roster</div>
                <h2 className="mt-1 text-2xl font-bold text-slate-50">Players</h2>
              </div>
              <button
                type="button"
                onClick={() => void playersQuery.refetch()}
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-300/30 hover:bg-amber-300/10"
              >
                <RefreshCcw className={cn('h-4 w-4', playersQuery.isFetching && 'animate-spin')} />
                Refresh
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, character, or play count"
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="mt-5 space-y-3">
              {playersQuery.isLoading ? (
                <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-8 text-slate-300">
                  <Loader2 className="h-5 w-5 animate-spin text-amber-200" />
                  Loading players...
                </div>
              ) : playersQuery.isError ? (
                <div className="rounded-3xl border border-red-400/20 bg-red-400/10 px-4 py-5 text-sm text-red-100">
                  プレイヤー一覧を取得できませんでした。Rails API が起動しているか確認してください。
                </div>
              ) : filteredPlayers.length > 0 ? (
                filteredPlayers.map((player: PlayerSummary) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    selected={player.id === selectedPlayerId}
                    onSelect={setSelectedPlayerId}
                    onLogin={(playerId) => loginMutation.mutate(playerId)}
                    loginPending={loginMutation.isPending && loginMutation.variables === player.id}
                  />
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-slate-400">
                  条件に合うプレイヤーが見つかりません。
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <PlayerDetailPanel
              player={selectedPlayer}
              editName={editPlayerName}
              onEditNameChange={setEditPlayerName}
              onSave={() => {
                if (!selectedPlayer || !editPlayerName.trim()) {
                  return;
                }

                updateMutation.mutate({ playerId: selectedPlayer.id, name: editPlayerName.trim() });
              }}
              onLogin={() => {
                if (!selectedPlayer) {
                  return;
                }

                loginMutation.mutate(selectedPlayer.id);
              }}
              savePending={updateMutation.isPending}
              loginPending={loginMutation.isPending && loginMutation.variables === selectedPlayer?.id}
            />

            <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 text-sm text-slate-300 shadow-glow backdrop-blur">
              <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Status</div>
              <div className="mt-3 space-y-2">
                <p>Selected Player: {selectedPlayer?.name ?? 'none'}</p>
                <p>Latest Login: {latestLoginLabel}</p>
                <p>API Base URL: {import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}