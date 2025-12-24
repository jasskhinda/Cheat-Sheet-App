'use client';

import { useState } from 'react';
import { nflPlayers, positionColors, tierLabels } from '@/data/players';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

type Position = 'ALL' | 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';

export default function RankingsPage() {
  const [selectedPosition, setSelectedPosition] = useState<Position>('ALL');

  const positions: Position[] = ['ALL', 'QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

  const filteredPlayers = selectedPosition === 'ALL'
    ? nflPlayers
    : nflPlayers.filter(p => p.position === selectedPosition);

  const sortedByProjection = [...filteredPlayers].sort(
    (a, b) => b.projectedPoints - a.projectedPoints
  );

  // Group by tier
  const playersByTier = sortedByProjection.reduce((acc, player) => {
    if (!acc[player.tier]) acc[player.tier] = [];
    acc[player.tier].push(player);
    return acc;
  }, {} as Record<number, typeof nflPlayers>);

  const getTrendIcon = (player: typeof nflPlayers[0]) => {
    const diff = player.projectedPoints - player.recentAvg;
    if (diff > 2) return <TrendingUp className="w-4 h-4 text-[#00d632]" />;
    if (diff < -2) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-[#8b949e]" />;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Player Rankings</h1>
          <p className="text-[#8b949e]">
            Tier-based rankings for Week 16
          </p>
        </div>

        {/* Position Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPosition === pos
                  ? 'bg-[#1a90ff] text-white'
                  : 'bg-[#161b22] text-[#8b949e] hover:text-white border border-[#30363d]'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* Tier Rankings */}
        <div className="space-y-8">
          {Object.entries(playersByTier)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([tier, players]) => (
              <div key={tier}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1 rounded-lg text-sm font-bold ${tierLabels[Number(tier)].color}`}>
                    Tier {tier}: {tierLabels[Number(tier)].label}
                  </div>
                  <span className="text-sm text-[#8b949e]">
                    {players.length} player{players.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid gap-3">
                  {players.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#1a90ff]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="w-8 h-8 rounded-lg bg-[#0d1117] flex items-center justify-center">
                          <span className="text-sm font-bold text-[#8b949e]">
                            {sortedByProjection.findIndex(p => p.id === player.id) + 1}
                          </span>
                        </div>

                        {/* Position Badge */}
                        <span
                          className={`px-2.5 py-1 rounded text-xs font-bold border ${
                            positionColors[player.position]
                          }`}
                        >
                          {player.position}
                        </span>

                        {/* Player Info */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{player.name}</span>
                            {getTrendIcon(player)}
                          </div>
                          <div className="text-sm text-[#8b949e]">
                            {player.team} • {player.opponent} • {player.gameTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Stats */}
                        <div className="hidden sm:flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <div className="text-[#8b949e] text-xs mb-1">Salary</div>
                            <div className="font-medium text-[#00d632]">
                              ${player.salary.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[#8b949e] text-xs mb-1">Proj</div>
                            <div className="font-bold text-white">
                              {player.projectedPoints.toFixed(1)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[#8b949e] text-xs mb-1">Ceiling</div>
                            <div className="font-medium text-green-400">
                              {player.ceiling}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[#8b949e] text-xs mb-1">Floor</div>
                            <div className="font-medium text-red-400">
                              {player.floor}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[#8b949e] text-xs mb-1">Value</div>
                            <div className="font-medium text-[#1a90ff]">
                              {player.value.toFixed(2)}x
                            </div>
                          </div>
                        </div>

                        {/* Mobile Projected */}
                        <div className="sm:hidden text-right">
                          <div className="font-bold text-white text-lg">
                            {player.projectedPoints.toFixed(1)}
                          </div>
                          <div className="text-xs text-[#8b949e]">
                            ${player.salary.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Legend */}
        <div className="mt-12 p-6 rounded-xl bg-[#161b22] border border-[#30363d]">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#1a90ff]" />
            Tier Guide
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(tierLabels).map(([tier, { label, color }]) => (
              <div key={tier} className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold ${color}`}>
                  Tier {tier}
                </span>
                <span className="text-sm text-[#8b949e]">
                  {label} - {tier === '1' ? 'Must starts' : tier === '2' ? 'Strong plays' : tier === '3' ? 'Flex options' : 'High risk/reward'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
