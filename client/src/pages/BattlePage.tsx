import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Monster from "../components/battle/Monster";
import { QuestionCard } from "../components/battle/QuestionCard";
import { useGame } from "../app/GameProvider";
import battleBg from "../assets/images/main_wallpaper.png"; 

export default function BattlePage() {
  const { gameState, setGameState } = useGame();
  const navigate = useNavigate();
  const { currentQuest, currentFight, player } = gameState;
  
  const TOTAL_PHASES = 3;
  // FIX: Use local state instead of GameProvider to avoid Type errors
  const [monsterHp, setMonsterHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(player.hp);

  const handleAnswer = (_selectedOptionIndex: number, correct: boolean) => {
    if (correct) {
      const isQuestComplete = currentFight >= TOTAL_PHASES - 1;

      if (isQuestComplete) {
        // 1. Create a unique list of completed quests (including this one)
        const currentCompleted = player.completedQuests || [];
        const updatedCompletedQuests = currentCompleted.includes(currentQuest) 
          ? currentCompleted 
          : [...currentCompleted, currentQuest];

        // 2. Save progress to global state
        setGameState({
          ...gameState,
          currentFight: 0,
          player: {
            ...player,
            completedQuests: updatedCompletedQuests as any,
            credits: player.credits + 100,
          }
        });

        // 3. ROUTING LOGIC
        // If the player has now completed 4 quests, the game is over.
        if (updatedCompletedQuests.length >= 4) {
          navigate('/end'); 
        } else {
          navigate('/bank'); 
        }
      } else {
        // Progress within the same quest
        setMonsterHp(prev => Math.max(0, prev - 33.4));
        setGameState({
          ...gameState,
          currentFight: currentFight + 1
        });
      }
    } else {
      // Logic for wrong answer: 4 strikes and you're out (25 HP each)
      const nextPlayerHp = Math.max(0, playerHp - 25);
      setPlayerHp(nextPlayerHp);

      // Persist HP to global game state and reset fight if dead
      setGameState({
        ...gameState,
        player: { ...player, hp: nextPlayerHp },
        currentFight: nextPlayerHp <= 0 ? 0 : currentFight
      });

      if (nextPlayerHp <= 0) {
        // Reset fight progress and navigate to DeathPage
        navigate('/death');
      }
    }
  };

  return (
    <div style={{ 
      position: "fixed", inset: 0, 
      backgroundImage: `url(${battleBg})`, backgroundSize: "cover", backgroundPosition: "center",
      overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: '"Orbitron", sans-serif'
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(10, 0, 20, 0.85)", zIndex: 0 }} />

      {/* TOP HUD */}
      <nav style={{ 
        zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0.75rem 2rem", background: "rgba(20, 10, 30, 0.6)",
        backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(124, 58, 237, 0.3)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#7c3aed", fontSize: "0.6rem", letterSpacing: "2px" }}>ACTIVE MISSION</span>
          <span style={{ color: "#fff", fontSize: "0.9rem", fontWeight: "bold" }}>{currentQuest.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#a78bfa", fontSize: "0.6rem" }}>CREDITS</div>
            <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "bold" }}>{player.credits}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#a78bfa", fontSize: "0.6rem" }}>SCORE</div>
            <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "bold" }}>{player.creditScore}</div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#ff00ff", fontSize: "0.8rem", fontWeight: "bold" }}>PHASE {currentFight + 1} / {TOTAL_PHASES}</div>
          <div style={{ color: playerHp < 40 ? "#ff4444" : "#a78bfa", fontSize: "0.5rem", marginTop: "2px" }}>
             {playerHp < 40 ? "⚠ CRITICAL ⚠" : "SYSTEM: NOMINAL"}
          </div>
        </div>
      </nav>

      {/* MAIN BATTLE AREA */}
      <div style={{ flex: 1, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: "6rem", marginTop: "-2rem" }}>
        
        {/* LEFT: Question Section */}
        <div style={{ width: 400 }}>
          <div style={{ color: '#7c3aed', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '1rem', fontWeight: 'bold' }}>▸ SELECT PROTOCOL</div>
          <QuestionCard
            key={`${currentQuest}-${currentFight}`} 
            questId={currentQuest}
            questionIndex={currentFight}
            onAnswer={handleAnswer}
          />
        </div>

        {/* RIGHT: Visual Section */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", animation: "bossFloat 4s ease-in-out infinite" }}>
          <Monster width={450} height={450} />
          
          {/* Monster Health Bar */}
          <div style={{ width: "250px", height: "6px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid #ff00ff", marginTop: "1rem", padding: '2px', borderRadius: '4px' }}>
            <div style={{ 
              width: `${monsterHp}%`, height: "100%", backgroundColor: "#ff00ff", 
              boxShadow: "0 0 15px #ff00ff", transition: 'width 0.4s ease-out' 
            }} />
          </div>
          <div style={{ color: '#ff00ff', fontSize: '0.65rem', marginTop: '0.6rem', letterSpacing: '2px', fontWeight: 'bold' }}>
            TARGET INTEGRITY: {Math.round(monsterHp)}%
          </div>

          {/* Player Health Bar (Small) */}
          <div style={{ width: "150px", height: "3px", backgroundColor: "rgba(255,255,255,0.1)", marginTop: "1.5rem", borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${playerHp}%`, height: "100%", backgroundColor: playerHp < 40 ? "#ff4444" : "#00ffcc", transition: 'all 0.3s' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bossFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}