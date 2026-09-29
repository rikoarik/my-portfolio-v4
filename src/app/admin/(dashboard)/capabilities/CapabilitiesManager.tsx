'use client';

import { useState } from 'react';
import { SkillGroup, SkillLevel } from '@/types/cms';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

export function CapabilitiesManager({
  initialGroups,
}: {
  initialGroups: SkillGroup[];
}) {
  const [groups, setGroups] = useState<SkillGroup[]>(initialGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(initialGroups[0]?.id || '');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('primary');
  const [message, setMessage] = useState<string | null>(null);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];

  const handleAddSkill = () => {
    if (!newSkillName.trim() || !selectedGroup) return;

    const newSkill = {
      id: crypto.randomUUID(),
      group_id: selectedGroup.id,
      name: newSkillName.trim(),
      level: newSkillLevel,
      featured: false,
      sort_order: (selectedGroup.skills?.length || 0) + 1,
      status: 'published' as const,
    };

    const updatedGroups = groups.map((g) => {
      if (g.id === selectedGroup.id) {
        return {
          ...g,
          skills: [...(g.skills || []), newSkill],
        };
      }
      return g;
    });

    setGroups(updatedGroups);
    setNewSkillName('');
    setMessage(`Added "${newSkill.name}" to ${selectedGroup.name}.`);
  };

  const handleRemoveSkill = (skillId: string) => {
    const updatedGroups = groups.map((g) => {
      if (g.id === selectedGroup?.id) {
        return {
          ...g,
          skills: g.skills?.filter((s) => s.id !== skillId),
        };
      }
      return g;
    });
    setGroups(updatedGroups);
    setMessage('Skill removed.');
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="p-3.5 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#4ADE80] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Category Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#27272A] pb-3">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => {
              setSelectedGroupId(group.id);
              setMessage(null);
            }}
            className={`tap-target px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              selectedGroup?.id === group.id
                ? 'bg-[#10B981] text-white font-semibold'
                : 'bg-[#18181B] text-[#A1A1AA] hover:text-white'
            }`}
          >
            {group.name} ({group.skills?.length || 0})
          </button>
        ))}
      </div>

      {/* Selected Group Editor */}
      {selectedGroup && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
            <div>
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Group: {selectedGroup.name}
              </h2>
              <p className="text-xs text-[#A1A1AA] pt-0.5">
                {selectedGroup.description || 'Category skills and proficiencies'}
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#71717A]">
              Order: {selectedGroup.sort_order}
            </span>
          </div>

          {/* Quick Add Form */}
          <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-3">
            <h3 className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Add Skill to {selectedGroup.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill name (e.g. Kotlin, PostgreSQL)"
                className="sm:col-span-7 px-3.5 py-2 rounded-lg bg-[#18181B] border border-[#27272A] text-white text-xs focus:outline-none focus:border-[#3B82F6]"
              />

              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                className="sm:col-span-3 px-3.5 py-2 rounded-lg bg-[#18181B] border border-[#27272A] text-white text-xs focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="basic">Basic</option>
              </select>

              <button
                type="button"
                onClick={handleAddSkill}
                className="sm:col-span-2 tap-target flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Assigned Skills:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {selectedGroup.skills?.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#09090B] border border-[#27272A] text-xs font-mono"
                >
                  <div className="space-y-0.5">
                    <p className="text-white font-medium">{skill.name}</p>
                    <p className="text-[10px] text-[#A1A1AA] uppercase">
                      Level: <span className="text-[#10B981]">{skill.level || 'primary'}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="p-1 text-[#71717A] hover:text-[#EF4444] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
