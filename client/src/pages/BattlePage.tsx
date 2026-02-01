import React, { useState } from "react"; // Added useState
import { useNavigate } from "react-router-dom";
import Monster from "../components/battle/Monster";
import { QuestionCard } from "../components/battle/QuestionCard";
import { useGame } from "../app/GameProvider";
import StatsBar from "../components/hud/StatsBar";

export default function BattlePage() {
  const { gameState, setGameState } = useGame();
  const navigate = useNavigate();
  const { currentQuest, currentFight, player } = gameState;
  
  const TOTAL_PHASES = 5;
  // FIX: Use local state instead of GameProvider to avoid Type errors
  const [monsterHp, setMonsterHp] = useState(100);
  const battleBg = `/assets/images/battle_bg.webp`;

  const handleAnswer = (selectedOptionIndex: number, correct: boolean) => {
    // 1. Calculate new player HP
    const newHp = correct ? player.hp : Math.max(0, player.hp - 20);
    
    // 2. Check for Victory
    const isVictory = currentFight >= TOTAL_PHASES - 1 && correct;

    if (isVictory) {
      setGameState({
        ...gameState,
        currentFight: 0,
        player: {
          ...player,
          completedQuests: [...player.completedQuests, currentQuest] as any,
          credits: player.credits + 100,
          hp: newHp
        }
      });
      navigate('/bank'); 
    } 
    else if (!correct && newHp <= 0) {
      // DEATH
      setGameState({ 
        ...gameState, 
        currentFight: 0, 
        player: { ...player, hp: 0 } 
      });
      navigate('/death');
    } 
    else if (correct) {
      // PROGRESS: Reduce monster HP locally and move to next question
      setMonsterHp(prev => Math.max(0, prev - 20));
      setGameState({
        ...gameState,
        currentFight: currentFight + 1,
        player: { ...player, hp: newHp }
      });
    } 
    else {
      // WRONG: Just take player damage, don't move currentFight
      setGameState({
        ...gameState,
        player: { ...player, hp: newHp }
      });
    }
  };

  return (
    <div style={{ 
      position: "fixed", inset: 0, 
      backgroundImage: `url(${battleBg})`, backgroundSize: "cover", backgroundPosition: "center",
      overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: '"Orbitron", sans-serif'
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(10, 0, 20, 0.85)", zIndex: 0 }} />

      {/* HUD NAV BAR */}
      <nav style={{ 
        zIndex: 10, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "0.75rem 2rem",
        background: "rgba(20, 10, 30, 0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(124, 58, 237, 0.3)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#7c3aed", fontSize: "0.6rem", letterSpacing: "2px" }}>ACTIVE MISSION</span>
          <span style={{ color: "#fff", fontSize: "0.9rem", fontWeight: "bold" }}>{currentQuest.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#a78bfa", fontSize: "0.6rem" }}>NEURAL HEALTH</div>
            <div style={{ color: player.hp < 40 ? "#ff4444" : "#00ffcc", fontSize: "1.1rem", fontWeight: "bold" }}>{player.hp}%</div>
          </div>
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
          <div style={{ color: player.hp < 40 ? "#ff4444" : "#a78bfa", fontSize: "0.5rem", marginTop: "2px" }}>
             {player.hp < 40 ? "⚠ CRITICAL ⚠" : "SYSTEM: NOMINAL"}
          </div>
        </div>
      </nav>

      <div style={{ flex: 1, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: "6rem", marginTop: "-2rem" }}>
        <div style={{ width: 400 }}>
          <div style={{ color: '#7c3aed', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '1rem', fontWeight: 'bold' }}>▸ SELECT PROTOCOL</div>
          <QuestionCard
            key={`${currentQuest}-${currentFight}`} 
            questId={currentQuest}
            questionIndex={currentFight}
            onAnswer={handleAnswer}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", animation: "bossFloat 4s ease-in-out infinite" }}>
          <Monster width={450} height={450} />
          <div style={{ width: "250px", height: "6px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid #ff00ff", marginTop: "1rem", padding: '2px', borderRadius: '4px' }}>
            <div style={{ 
              width: `${monsterHp}%`, height: "100%", backgroundColor: "#ff00ff", 
              boxShadow: "0 0 15px #ff00ff", transition: 'width 0.4s ease-out' 
            }} />
          </div>
          <div style={{ color: '#ff00ff', fontSize: '0.65rem', marginTop: '0.6rem', letterSpacing: '2px', fontWeight: 'bold' }}>
            TARGET INTEGRITY: {Math.round(monsterHp)}%
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