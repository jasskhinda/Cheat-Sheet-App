'use client';

import { useState } from 'react';
import { Player, positionColors, tierLabels } from '@/data/players';
import { ChevronUp, ChevronDown, Plus, AlertCircle, TrendingUp } from 'lucide-react';

interface PlayerTableProps {
  players: Player[];
  onAddPlayer?: (player: Player) => void;
  showAddButton?: boolean;
}

type SortKey = 'projectedPoints' | 'salary' | 'value' | 'name';
type SortDirection = 'asc' | 'desc';

export default function PlayerTable({ players, onAddPlayer, showAddButton = false }: PlayerTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('projectedPoints');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [positionFilter, setPositionFilter] = useState<string>('ALL');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const filteredPlayers = players.filter(
    (player) => positionFilter === 'ALL' || player.position === positionFilter
  );

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    let comparison = 0;
    if (sortKey === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else {
      comparison = a[sortKey] - b[sortKey];
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const positions = ['ALL', 'QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  return (
    <div className="bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-[#30363d] flex flex-wrap gap-2">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setPositionFilter(pos)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              positionFilter === pos
                ? 'bg-[#1a90ff] text-white'
                : 'bg-[#0d1117] text-[#8b949e] hover:text-white border border-[#30363d]'
            }`}
          >
            {pos}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full player-table">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-[#8b949e] border-b border-[#30363d]">
              <th className="px-4 py-3 font-medium">Rank</th>
              <th
                className="px-4 py-3 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('name')}
              >
                Player <SortIcon columnKey="name" />
              </th>
              <th className="px-4 py-3 font-medium">Pos</th>
              <th className="px-4 py-3 font-medium">Matchup</th>
              <th
                className="px-4 py-3 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('salary')}
              >
                Salary <SortIcon columnKey="salary" />
              </th>
              <th
                className="px-4 py-3 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('projectedPoints')}
              >
                Proj <SortIcon columnKey="projectedPoints" />
              </th>
              <th
                className="px-4 py-3 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('value')}
              >
                Value <SortIcon columnKey="value" />
              </th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">Ceiling/Floor</th>
              {showAddButton && <th className="px-4 py-3 font-medium"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#30363d]">
            {sortedPlayers.map((player, index) => (
              <tr
                key={player.id}
                className="hover:bg-[#1a90ff]/5 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-[#8b949e]">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {player.name}
                        {player.status !== 'healthy' && (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="text-xs text-[#8b949e]">
                        {player.team} • {player.gameTime}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold border ${
                      positionColors[player.position]
                    }`}
                  >
                    {player.position}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#8b949e]">
                  {player.opponent}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-[#00d632]">
                  ${player.salary.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-white">
                      {player.projectedPoints.toFixed(1)}
                    </span>
                    <TrendingUp className="w-3 h-3 text-[#00d632]" />
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-[#1a90ff]">
                  {player.value.toFixed(2)}x
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      tierLabels[player.tier].color
                    }`}
                  >
                    {tierLabels[player.tier].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#8b949e]">
                  <span className="text-green-400">{player.ceiling}</span>
                  <span className="mx-1">/</span>
                  <span className="text-red-400">{player.floor}</span>
                </td>
                {showAddButton && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onAddPlayer?.(player)}
                      className="p-1.5 rounded-lg bg-[#1a90ff]/20 text-[#1a90ff] hover:bg-[#1a90ff]/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
