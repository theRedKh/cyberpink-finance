//all the dialogue for last banker, mc, apocolypse npc, enemies comes here
// data/dialogue.ts
import type { QuestId } from "../game/types";

export type DialogueEntry = {
    id: string;
    speaker: string; // "Player", "Last Banker", "Influx", "Mind-controlled NPC".
    text: string;
    questId?: string; // Optional: if dialogue is quest-specific
    sceneType: "pre-quest" | "pre-boss" | "general";
};

export type SceneType = "pre-quest" | "pre-boss" | "general";

// Type definitions for the dialogue structure
export type HomeBaseDialogue = Record<QuestId, DialogueEntry[]>;

export type BossSceneDialogue = {
    quest4: DialogueEntry[]; // Influx dialogues for final boss
};

export type DialogueStructure = {
    homeBase: HomeBaseDialogue;
    npcScene: DialogueEntry[]; // NPC scene occurs once before first transition to home base
    bossScene: BossSceneDialogue;
};

export const DIALOGUE: DialogueStructure = {
    homeBase: {
        quest1: [
            {
                id: "q1_1",
                speaker: "Last Banker",
                text: "Ah, a new traveler! To begin, you must understand the difference between saving and spending. Can you keep some coins for later?",
                sceneType: "pre-quest",
            },
            {
                id: "q1_2",
                speaker: "Player",
                text: "I will try to save. Show me how!",
                sceneType: "pre-quest",
            },
            {
                id: "q1_3",
                speaker: "Last Banker",
                text: "Good. Your first quest will teach you to track expenses and resist impulse purchases.",
                sceneType: "pre-quest",
            },
        ],
        quest2: [
            {
                id: "q2_1",
                speaker: "Last Banker",
                text: "Now that you know about saving, let's talk about budgeting and setting goals.",
                sceneType: "pre-quest",
            },
            {
                id: "q2_2",
                speaker: "Player",
                text: "How should I split my earnings?",
                sceneType: "pre-quest",
            },
            {
                id: "q2_3",
                speaker: "Last Banker",
                text: "A simple plan: needs, wants, and savings. Complete your next quest to practice it.",
                sceneType: "pre-quest",
            },
        ],
        quest3: [
            {
                id: "q3_1",
                speaker: "Last Banker",
                text: "Investing can grow your wealth over time, but it comes with risks.",
                sceneType: "pre-quest",
            },
            {
                id: "q3_2",
                speaker: "Player",
                text: "How do I choose where to invest?",
                sceneType: "pre-quest",
            },
            {
                id: "q3_3",
                speaker: "Last Banker",
                text: "Learn diversification and patience in the next quest — don't put all your coins in one chest.",
                sceneType: "pre-quest",
            },
        ],
        quest4: [
            {
                id: "q4_1",
                speaker: "Last Banker",
                text: "This final challenge will test everything you've learned: budgeting, savings, and investing.",
                sceneType: "pre-quest",
            },
            {
                id: "q4_2",
                speaker: "Player",
                text: "I'm ready. Teach me the final lesson.",
                sceneType: "pre-quest",
            },
            {
                id: "q4_3",
                speaker: "Last Banker",
                text: "Remember: build habits, not shortcuts. Good luck, adventurer.",
                sceneType: "pre-quest",
            },
        ],
    },
    npcScene: [
        // NPC scene occurs once, right before the first transition to home base
        {
            id: "npc_intro_1",
            speaker: "Last Banker",
            text: "Welcome, traveler. I am the Last Banker, keeper of the old ways. Before you begin your journey, you must understand the fundamentals of banking.",
            sceneType: "pre-quest"
        },
    ],
    bossScene: {
        quest4: [
            // Influx dialogues for final boss
            // Add dialogue entries here
        ],
    },
};

/**
 * Get dialogues for home base based on the next quest
 * @param questId - The quest ID for which to fetch home base dialogues
 * @returns Array of dialogue entries for the home base scene
 */
export function getHomeBaseDialogue(questId: QuestId): DialogueEntry[] {
    return DIALOGUE.homeBase[questId] || [];
}

/**
 * Get NPC scene dialogues (occurs once before first transition to home base)
 * @returns Array of dialogue entries for the NPC scene
 */
export function getNpcSceneDialogue(): DialogueEntry[] {
    return DIALOGUE.npcScene || [];
}

/**
 * Get boss dialogues (primarily for Influx in quest4)
 * @param questId - The quest ID (currently only quest4 has boss dialogues)
 * @returns Array of dialogue entries for the boss scene
 */
export function getBossDialogue(questId: QuestId): DialogueEntry[] {
    if (questId === "quest4") {
        return DIALOGUE.bossScene.quest4 || [];
    }
    return [];
}