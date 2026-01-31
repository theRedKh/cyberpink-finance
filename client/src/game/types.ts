<<<<<<< HEAD
export type QuestId = "quest1" | "quest2" | "quest3" | "quest4";
=======
export type QuestId = "quest1" | "quest2" | "quest3" | "boss";
export type Quest = {
    id: QuestId;
    name: string;
    fights: number;
    rewardType?: "weapon" | "armor" | "ability";
    isBoss: boolean;

}
>>>>>>> 4a6b422582c485804a948de602d270c9fb3a3b58

export type Question = {
    id: string;
    question: string;
    options: string[];
    answer: number;
    explanation?: string; 
};

export type CreditScore = "Poor" | "Fair" | "Good" | "Excellent";

export type RewardType = "weapon" | "armor" | "ability";

export type InventoryItem = {
    id: string;
    name: string;
    type: RewardType;
    description: string;
};

export type BankChoice = "good" | "bad" | null;

export type PlayerState = {
    credits: number;
    clarity: number;
    hp: number;
    creditScore: CreditScore;
    inventory: InventoryItem[];
    bankChoice: BankChoice;
    completedQuests: QuestId[];
    unlockedQuests: QuestId[];
    playerId: string;
}

export type GameNotification = {
    type: "success" | "warning" | "info";
    message: string;
    timestamp: number;
}