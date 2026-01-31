//all the dialogue for last banker, mc, apocolypse npc, enemies comes here
// data/dialogue.ts
export type DialogueEntry = {
    id: string;
    speaker: string; // "Player", "Last Banker", "Influx", "Mind-controlled NPC".
    text: string;
    questId?: string; // Optional: if dialogue is quest-specific
    sceneType: "pre-quest" | "pre-boss" | "general";
};
  
  export const DIALOGUE = {
    preQuest1: [...],
    preBoss: [...],
    // etc.
};