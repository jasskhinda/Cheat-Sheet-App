'use client';

import { useState } from 'react';
import PlayerTable from '@/components/PlayerTable';
import { nflPlayers, Player } from '@/data/players';
import { Calendar, Filter, Download, RefreshCw, Clock, TrendingUp } from 'lucide-react';

export default function CheatSheetPage() {
  const [selectedWeek] = useState(16);
  const [platform, setPlatform] = useState<'draftkings' | 'fanduel'>('draftkings');

  const topProjected = [...nflPlayers]
    .sort((a, b) => b.projectedPoints - a.projectedPoints)
    .slice(0, 5);

  const bestValue = [...nflPlayers]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">NFL Cheat Sheet</h1>
            <p className="text-[#8b949e]">
              Week {selectedWeek} • Expert projections and rankings
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Platform Toggle */}
            <div className="flex rounded-lg bg-[#161b22] border border-[#30363d] p-1">
              <button
                onClick={() => setPlatform('draftkings')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  platform === 'draftkings'
                    ? 'bg-[#1a90ff] text-white'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                DraftKings
              </button>
              <button
                onClick={() => setPlatform('fanduel')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  platform === 'fanduel'
                    ? 'bg-[#1a90ff] text-white'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                FanDuel
              </button>
            </div>

            {/* Week Selector */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-sm text-[#8b949e] hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
              Week {selectedWeek}
            </button>

            {/* Actions */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-sm text-[#8b949e] hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d632] text-black text-sm font-medium hover:bg-[#00d632]/80 transition-colors">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8b949e]">Games This Week</span>
              <Clock className="w-4 h-4 text-[#8b949e]" />
            </div>
            <div className="text-2xl font-bold text-white">16</div>
            <div className="text-xs text-[#00d632]">Full Slate</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8b949e]">Players Ranked</span>
              <TrendingUp className="w-4 h-4 text-[#8b949e]" />
            </div>
            <div className="text-2xl font-bold text-white">{nflPlayers.length}</div>
            <div className="text-xs text-[#1a90ff]">All positions</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8b949e]">Injuries to Monitor</span>
              <Filter className="w-4 h-4 text-[#8b949e]" />
            </div>
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-xs text-yellow-400">Questionable</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8b949e]">Last Updated</span>
              <RefreshCw className="w-4 h-4 text-[#8b949e]" />
            </div>
            <div className="text-2xl font-bold text-white">Now</div>
            <div className="text-xs text-[#00d632]">Live data</div>
          </div>
        </div>

        {/* Quick Picks */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Projected */}
          <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d]">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00d632]" />
              Top Projected
            </h3>
            <div className="space-y-3">
              {topProjected.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#8b949e] w-5">{index + 1}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{player.name}</div>
                      <div className="text-xs text-[#8b949e]">{player.team} • {player.position}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#00d632]">{player.projectedPoints.toFixed(1)} pts</div>
                    <div className="text-xs text-[#8b949e]">${player.salary.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Value */}
          <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d]">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1a90ff]" />
              Best Value Plays
            </h3>
            <div className="space-y-3">
              {bestValue.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#8b949e] w-5">{index + 1}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{player.name}</div>
                      <div className="text-xs text-[#8b949e]">{player.team} • {player.position}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#1a90ff]">{player.value.toFixed(2)}x</div>
                    <div className="text-xs text-[#8b949e]">${player.salary.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Player Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">All Players</h2>
          <PlayerTable players={nflPlayers} />
        </div>
      </div>
    </div>
  );
}
