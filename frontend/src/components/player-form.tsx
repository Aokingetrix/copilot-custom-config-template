interface PlayerFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  pending: boolean;
}

export function PlayerForm({ value, onChange, onSubmit, pending }: PlayerFormProps) {
  return (
    <form
      className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="new-player-name" className="text-xs uppercase tracking-[0.28em] text-slate-400">
            Create Player
          </label>
          <input
            id="new-player-name"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20"
            placeholder="Enter a new player name"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? 'Creating...' : 'Create Player'}
        </button>
      </div>
    </form>
  );
}