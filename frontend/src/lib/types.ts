export interface PlayerSummary {
  id: number;
  name: string;
  last_login_at: string | null;
  play_count: number;
  character_count: number;
  character_names: string[];
  latest_score: number | null;
}

export interface PlayerCharacter {
  id: number;
  character_master_id: number;
  character_name: string | null;
}

export interface PlayHistory {
  id: number;
  played_at: string;
  score: number | null;
}

export interface PlayerDetail extends PlayerSummary {
  characters: PlayerCharacter[];
  play_histories: PlayHistory[];
}

export interface CreatePlayerInput {
  name: string;
}

export interface UpdatePlayerInput {
  name: string;
}