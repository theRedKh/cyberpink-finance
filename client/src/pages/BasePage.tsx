import { useState, useEffect } from 'react';
import { useGame } from '../app/GameProvider';
import { useNavigate } from 'react-router-dom';
import mainWallpaper from '../assets/images/main_wallpaper.png';
import { Button } from '../components/ui/Button';
import { getHomeBaseDialogue } from '../data/dialogue';
import type { QuestId } from '../game/types';
import Modal from '../components/ui/Modal';

const getBankTellerRewards = (gameState: any) => {
  const { player } = gameState;
  const { completedQuests } = player;

  // Reward logic based on what you JUST finished
  if (completedQuests.includes('quest1') && !completedQuests.includes('quest2')) {
    return {
      showRewards: true,
      rewards: [
        { id: 'debit_sword', name: 'Debit Sword', description: 'Spend only what you have.', icon: '⚔️' },
        { id: 'credit_blade', name: 'Credit Blade', description: 'Borrow power from the future.', icon: '🗡️' },
      ],
    };
  }
  if (completedQuests.includes('quest2') && !completedQuests.includes('quest3')) {
    return {
      showRewards: true,
      rewards: [
        { id: 'budget_armor', name: "Planner's Armor", description: 'Protects from overspending.', icon: '🛡️' },
        { id: 'impulse_chainmail', name: 'Impulse Chainmail', description: 'Risky spending habits.', icon: '🥋' },
      ],
    };
  }
  return { showRewards: false, rewards: [] };
};

const getNextQuestId = (completedQuests: QuestId[]): QuestId => {
  if (!completedQuests.includes('quest1')) return 'quest1';
  if (!completedQuests.includes('quest2')) return 'quest2';
  if (!completedQuests.includes('quest3')) return 'quest3';
  return 'quest4';
};

export default function BasePage() {
  const { gameState, setGameState } = useGame();
  const navigate = useNavigate();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  // This calculates where the player is based on their saved "completedQuests"
  const nextQuestId = getNextQuestId(gameState.player.completedQuests);
  const dialogues = getHomeBaseDialogue(nextQuestId);
  
  const dialoguesToShow = dialogues.length
    ? dialogues
    : [{ id: 'default', speaker: 'Bank Teller', text: "Welcome!", sceneType: 'general' }];

  useEffect(() => { setCurrentDialogueIndex(0); }, [nextQuestId]);

  const currentDialogue = dialoguesToShow[currentDialogueIndex];
  const rewardInfo = getBankTellerRewards(gameState);
  const isLastDialogue = currentDialogueIndex === dialoguesToShow.length - 1;

  const handleNext = () => currentDialogueIndex < dialoguesToShow.length - 1 && setCurrentDialogueIndex(prev => prev + 1);
  const handlePrev = () => currentDialogueIndex > 0 && setCurrentDialogueIndex(prev => prev - 1);

  const handleRewardSelect = (rewardId: string) => {
    setSelectedReward(rewardId);
    let updatedPlayer = { ...gameState.player, inventory: [...gameState.player.inventory, rewardId] as any };
    setGameState({ ...gameState, player: updatedPlayer });
    setTimeout(() => navigate('/map'), 1000);
  };

  return (
    <div style={{ 
      position: 'fixed', inset: 0, 
      backgroundImage: `url(${mainWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center',
      overflow: 'hidden', zIndex: 1
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2 }} />

      <Modal
        type="dialogue"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', 
          height: '400px', 
          width: '440px',  
          margin: 0,
          zIndex: 100,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid rgba(124, 58, 237, 0.5)',
          background: 'rgba(12, 8, 20, 0.98)',
          borderRadius: '15px',
          boxShadow: '0 0 50px rgba(0,0,0,1)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* HEADER */}
          <div style={{ textAlign: 'center', height: '90px' }}>
            <div style={{ 
              width: 60, height: 60, margin: '0 auto', borderRadius: '50%', 
              border: '2px solid #7c3aed', overflow: 'hidden' 
            }}>
              <img src={'src/assets/images/bankTellerImage.png'} alt="Bank Teller" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ color: '#a78bfa', fontFamily: '"Orbitron", sans-serif', fontSize: '0.75rem', marginTop: '0.4rem', letterSpacing: '2px' }}>
              BANK TELLER
            </div>
          </div>

          {/* MIDDLE AREA */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '15px' }}>
            
            <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
              <p style={{ color: '#fff', fontSize: '1.05rem', textAlign: 'center', margin: 0, lineHeight: '1.5', fontWeight: 500 }}>
                "{currentDialogue?.text}"
              </p>
            </div>

            <div style={{ height: '90px' }}>
              {rewardInfo.showRewards && isLastDialogue && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '0 10px' }}>
                  {rewardInfo.rewards.map((reward: any) => (
                    <div 
                      key={reward.id} 
                      onClick={() => handleRewardSelect(reward.id)} 
                      style={{ 
                        padding: '0.5rem', borderRadius: 8, textAlign: 'center',
                        border: `1px solid ${selectedReward === reward.id ? '#ff00ff' : '#4c1d95'}`, 
                        background: selectedReward === reward.id ? 'rgba(255,0,255,0.15)' : 'rgba(0,0,0,0.4)', 
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{reward.icon}</span>
                      <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.75rem' }}>{reward.name}</span>
                      <span style={{ color: '#888', fontSize: '0.6rem' }}>{reward.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ 
            marginTop: 'auto',
            padding: '0.8rem 1.5rem 0 1.5rem', 
            borderTop: '1px solid rgba(124, 58, 237, 0.2)',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Button onClick={currentDialogueIndex === 0 ? () => navigate('/intro') : handlePrev}>
              {currentDialogueIndex === 0 ? '←' : 'Prev'}
            </Button>

            <span style={{ color: '#a78bfa', fontSize: '0.7rem', fontFamily: '"Orbitron", sans-serif' }}>
              {currentDialogueIndex + 1} / {dialoguesToShow.length}
            </span>

            <div style={{ width: '70px', display: 'flex', justifyContent: 'flex-end' }}>
              {isLastDialogue && !rewardInfo.showRewards ? (
                <Button onClick={() => navigate('/map')}>Start</Button>
              ) : (
                <Button onClick={handleNext} disabled={isLastDialogue}>Next</Button>
              )}
            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
}