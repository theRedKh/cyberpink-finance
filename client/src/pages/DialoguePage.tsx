import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import HighlightableText from '../components/ui/HiglightableText';
import GlossaryModal from '../components/ui/GlossaryModal';
import { GLOSSARY } from '../data/glossary';
import { DIALOGUE, formatDialogueText } from "../data/dialogue";
import { useGame } from "../app/GameProvider";

// Assets
import introWallpaper from '../assets/images/battle_bg.webp'; // Placeholder for intro bg
import baseWallpaper from '../assets/images/main_wallpaper.png';   // Banker's bank bg
import elliPortrait from '../assets/images/MC.png';
import bankerPortrait from '../assets/images/last_banker.png';

import type { QuestId } from "../game/types";
import "../styles/dialogue.css";

export default function DialoguePage() {
  const { questId: urlQuestId } = useParams<{ questId: string }>();
  const navigate = useNavigate();
  const { gameState, setGameState } = useGame();
  
  // Track current phase: 'intro' or a specific QuestId
  const [activePhase, setActivePhase] = useState<string>(urlQuestId || 'intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Glossary State
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryItem, setGlossaryItem] = useState<{ term: string; definition: string } | null>(null);

  // Determine current dialogue set
  const dialogues = useMemo(() => {
    if (activePhase === 'intro') return DIALOGUE.introScene;
    if (DIALOGUE.homeBase[activePhase as QuestId]) return DIALOGUE.homeBase[activePhase as QuestId];
    return [];
  }, [activePhase]);

  const currentLine = dialogues[currentIndex];
  const isLastLine = currentIndex === dialogues.length - 1;

  // Asset Logic
  const isQuestDialogue = activePhase !== 'intro';
  const background = isQuestDialogue ? baseWallpaper : introWallpaper;
  
  // Character Asset Placeholder Logic
  const getSpeakerAsset = (speaker: string) => {
    if (speaker === "Elli") return elliPortrait;
    if (speaker === "The Last Banker") {
        // Only show banker image if we have moved into the quest phase
        return isQuestDialogue ? bankerPortrait : null; 
    }
    return null;
  };

  const handleNext = () => {
    if (!isLastLine) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (activePhase === 'intro') {
        // TRANSITION: Intro finished -> Move to Quest 1 dialogue immediately
        setGameState({
            ...gameState,
            player: { ...gameState.player, hasSeenIntro: true }
        });
        setActivePhase('quest1');
        setCurrentIndex(0);
      } else {
        // Finished quest dialogue -> Go to map
        navigate('/map');
      }
    }
  };

  const handleTermClick = (termLower: string) => {
    const def = GLOSSARY[termLower];
    if (def) {
      setGlossaryItem({ term: termLower, definition: def });
      setGlossaryOpen(true);
    }
  };

  if (!currentLine) return null;

  return (
    <div style={{ 
      position: 'fixed', inset: 0, backgroundImage: `url(${background})`, 
      backgroundSize: 'cover', transition: 'background-image 1s ease-in-out',
      display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)' }} />

      <Modal type="dialogue" style={{ width: "min(95vw, 750px)", zIndex: 10, background: 'rgba(12, 8, 20, 0.98)', border: '1px solid #7c3aed' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
          
          {/* HEADER WITH UPDATED CLASSES */}
          <div className="dialogue-header">
            <div className="portrait-placeholder">
              {getSpeakerAsset(currentLine.speaker) ? (
                <img 
                    src={getSpeakerAsset(currentLine.speaker)!} 
                    alt={currentLine.speaker} 
                    className="portrait-image"
                />
              ) : (
                <div className="no-image-text">??</div>
              )}
            </div>
            
            <h3 className="speaker-name">
              {currentLine.speaker.toUpperCase()}
            </h3>
          </div>

          {/* TEXT AREA */}
          <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center' }}>
            <div className="dialogue-text-content">
              <HighlightableText
                text={formatDialogueText(currentLine.text)}
                terms={Object.keys(GLOSSARY)}
                onTermClick={handleTermClick}
              />
              </div>
          </div>

          {/* FOOTER */}
          <div className="dialogue-nav">
            <Button onClick={() => setCurrentIndex(i => i - 1)} disabled={currentIndex === 0}>←</Button>
            
            <span className="dialogue-counter">
              {activePhase.toUpperCase()} — {currentIndex + 1} / {dialogues.length}
            </span>

            <Button onClick={handleNext}>
              {isLastLine && activePhase !== 'intro' ? "To the Map" : "Next"}
            </Button>
          </div>
        </div>
      </Modal>

      <GlossaryModal
        open={glossaryOpen}
        term={glossaryItem?.term}
        definition={glossaryItem?.definition}
        onClose={() => setGlossaryOpen(false)}
      />
    </div>
  );
}