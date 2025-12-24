'use client';

import { useState } from 'react';
import PlayerTable from '@/components/PlayerTable';
import { nflPlayers, Player, positionColors } from '@/data/players';
import { Trash2, Zap, Download, RotateCcw, DollarSign, Target, AlertTriangle } from 'lucide-react';

interface LineupSlot {
  position: string;
  player: Player | null;
}

const SALARY_CAP = 50000;

const initialLineup: LineupSlot[] = [
  { position: 'QB', player: null },
  { position: 'RB1', player: null },
  { position: 'RB2', player: null },
  { position: 'WR1', player: null },
  { position: 'WR2', player: null },
  { position: 'WR3', player: null },
  { position: 'TE', player: null },
  { position: 'FLEX', player: null },
  { position: 'DEF', player: null },
];

export default function LineupPage() {
  const [lineup, setLineup] = useState<LineupSlot[]>(initialLineup);
  const [platform, setPlatform] = useState<'draftkings' | 'fanduel'>('draftkings');

  const usedPlayerIds = new Set(lineup.filter(s => s.player).map(s => s.player!.id));
  const availablePlayers = nflPlayers.filter(p => !usedPlayerIds.has(p.id));

  const totalSalary = lineup.reduce((sum, slot) => sum + (slot.player?.salary || 0), 0);
  const remainingSalary = SALARY_CAP - totalSalary;
  const totalProjected = lineup.reduce((sum, slot) => sum + (slot.player?.projectedPoints || 0), 0);
  const filledSlots = lineup.filter(s => s.player).length;

  const handleAddPlayer = (player: Player) => {
    const positionBase = player.position === 'DEF' ? 'DEF' : player.position;

    // Find empty slot for this position
    let slotIndex = lineup.findIndex(slot => {
      if (slot.player) return false;

      if (positionBase === 'QB') return slot.position === 'QB';
      if (positionBase === 'RB') return slot.position === 'RB1' || slot.position === 'RB2';
      if (positionBase === 'WR') return slot.position === 'WR1' || slot.position === 'WR2' || slot.position === 'WR3';
      if (positionBase === 'TE') return slot.position === 'TE';
      if (positionBase === 'K') return false; // No kicker slot in this example
      if (positionBase === 'DEF') return slot.position === 'DEF';
      return false;
    });

    // If no position slot, try FLEX (RB, WR, TE only)
    if (slotIndex === -1 && ['RB', 'WR', 'TE'].includes(positionBase)) {
      slotIndex = lineup.findIndex(slot => slot.position === 'FLEX' && !slot.player);
    }

    if (slotIndex !== -1 && totalSalary + player.salary <= SALARY_CAP) {
      const newLineup = [...lineup];
      newLineup[slotIndex] = { ...newLineup[slotIndex], player };
      setLineup(newLineup);
    }
  };

  const handleRemovePlayer = (index: number) => {
    const newLineup = [...lineup];
    newLineup[index] = { ...newLineup[index], player: null };
    setLineup(newLineup);
  };

  const handleClearLineup = () => {
    setLineup(initialLineup);
  };

  const handleOptimize = () => {
    // Simple optimizer: fill each slot with the best projected player that fits
    const newLineup = [...initialLineup];
    const usedIds = new Set<number>();

    const fillSlot = (slotIndex: number, positions: string[]) => {
      const bestPlayer = nflPlayers
        .filter(p => positions.includes(p.position) && !usedIds.has(p.id))
        .sort((a, b) => b.value - a.value)[0];

      if (bestPlayer) {
        newLineup[slotIndex] = { ...newLineup[slotIndex], player: bestPlayer };
        usedIds.add(bestPlayer.id);
      }
    };

    fillSlot(0, ['QB']);
    fillSlot(1, ['RB']);
    fillSlot(2, ['RB']);
    fillSlot(3, ['WR']);
    fillSlot(4, ['WR']);
    fillSlot(5, ['WR']);
    fillSlot(6, ['TE']);
    fillSlot(7, ['RB', 'WR', 'TE']);
    fillSlot(8, ['DEF']);

    setLineup(newLineup);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Lineup Builder</h1>
            <p className="text-[#8b949e]">Build your optimal DFS lineup</p>
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

            <button
              onClick={handleOptimize}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a90ff] text-white text-sm font-medium hover:bg-[#1a90ff]/80 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Auto-Optimize
            </button>

            <button
              onClick={handleClearLineup}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-sm text-[#8b949e] hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d632] text-black text-sm font-medium hover:bg-[#00d632]/80 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lineup Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
                  <div className="flex items-center gap-2 text-sm text-[#8b949e] mb-1">
                    <DollarSign className="w-4 h-4" />
                    Salary
                  </div>
                  <div className="text-xl font-bold text-white">
                    ${totalSalary.toLocaleString()}
                  </div>
                  <div className={`text-xs ${remainingSalary >= 0 ? 'text-[#00d632]' : 'text-red-400'}`}>
                    ${remainingSalary.toLocaleString()} remaining
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
                  <div className="flex items-center gap-2 text-sm text-[#8b949e] mb-1">
                    <Target className="w-4 h-4" />
                    Projected
                  </div>
                  <div className="text-xl font-bold text-[#00d632]">
                    {totalProjected.toFixed(1)}
                  </div>
                  <div className="text-xs text-[#8b949e]">
                    {filledSlots}/9 slots filled
                  </div>
                </div>
              </div>

              {/* Salary Progress */}
              <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8b949e]">Salary Cap</span>
                  <span className="text-white">${SALARY_CAP.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      remainingSalary < 0 ? 'bg-red-500' : 'bg-[#1a90ff]'
                    }`}
                    style={{ width: `${Math.min(100, (totalSalary / SALARY_CAP) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Lineup Slots */}
              <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
                <h3 className="text-sm font-semibold text-white mb-4">Your Lineup</h3>
                <div className="space-y-2">
                  {lineup.map((slot, index) => (
                    <div
                      key={slot.position}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        slot.player
                          ? 'bg-[#0d1117] border-[#30363d]'
                          : 'bg-[#0d1117]/50 border-dashed border-[#30363d]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold ${
                            positionColors[slot.position.replace(/[0-9]/g, '')] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          } border`}
                        >
                          {slot.position}
                        </span>
                        {slot.player ? (
                          <div>
                            <div className="text-sm font-medium text-white">
                              {slot.player.name}
                            </div>
                            <div className="text-xs text-[#8b949e]">
                              {slot.player.team} • ${slot.player.salary.toLocaleString()}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-[#8b949e]">Empty</span>
                        )}
                      </div>
                      {slot.player && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#00d632]">
                            {slot.player.projectedPoints.toFixed(1)}
                          </span>
                          <button
                            onClick={() => handleRemovePlayer(index)}
                            className="p-1 rounded hover:bg-red-500/20 text-[#8b949e] hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              {remainingSalary < 0 && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-red-400">Over Salary Cap</div>
                    <div className="text-xs text-red-400/80">
                      Remove ${Math.abs(remainingSalary).toLocaleString()} to submit
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Player Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">Available Players</h2>
            <PlayerTable
              players={availablePlayers}
              onAddPlayer={handleAddPlayer}
              showAddButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
