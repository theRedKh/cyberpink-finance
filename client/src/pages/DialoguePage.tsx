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
import introWallpaper from '../assets/images/battle_bg.webp'; 
import baseWallpaper from '../assets/images/main_wallpaper.png';  
import elliPortrait from '../assets/images/MC.png';
import bankerPortrait from '../assets/images/last_banker.png';

import type { QuestId } from "../game/types";
import "../styles/dialogue.css";

export default function DialoguePage() {
  const { questId: urlQuestId } = useParams<{ questId: string }>();
  const navigate = useNavigate();
  const { gameState, setGameState } = useGame();
  
  /**
   * State Management
   * activePhase tracks whether we are in 'intro' or a specific 'questX'
   */
  const [activePhase, setActivePhase] = useState<string>(urlQuestId || 'intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Glossary State
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryItem, setGlossaryItem] = useState<{ term: string; definition: string } | null>(null);

  /**
   * Sync local state with URL parameters.
   * This prevents skipping the intro if the component mounts with a different param.
   */
  useEffect(() => {
    if (urlQuestId) {
      setActivePhase(urlQuestId);
      setCurrentIndex(0);
    }
  }, [urlQuestId]);

  /**
   * Dialogue Selector Logic
   */
  const dialogues = useMemo(() => {
    if (urlQuestId === 'intro') {
      console.log('intro')
      return DIALOGUE.introScene;
    }

    if (!gameState.player.hasSeenIntro) {
      // If intro hasn't been seen, show intro dialogue regardless of URL param
      return DIALOGUE.introScene;
    }
    // Type cast to QuestId to access homeBase record
    const qId = activePhase as QuestId;
    if (DIALOGUE.homeBase[qId]) {
      return DIALOGUE.homeBase[qId];
    }
    return [];
  }, [activePhase, gameState.player.hasSeenIntro, urlQuestId]);

  const currentLine = dialogues[currentIndex];
  const isLastLine = currentIndex === dialogues.length - 1;

  /**
   * Dynamic Assets logic
   */
  const isQuestDialogue = activePhase !== 'intro';
  const background = isQuestDialogue ? baseWallpaper : introWallpaper;
  
  const getSpeakerAsset = (speaker: string) => {
    if (speaker === "Elli") return elliPortrait;
    if (speaker === "The Last Banker") {
        // As requested: Banker is blank during Intro, visible during Quest1+
        return isQuestDialogue ? bankerPortrait : null; 
    }
    return null;
  };

  /**
   * Navigation Logic
   */
  const handleNext = () => {
    if (!isLastLine) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (activePhase === 'intro') {
        // Update GameState so BasePage knows the intro is done
        setGameState({
            ...gameState,
            player: { ...gameState.player, hasSeenIntro: true }
        });
        // Immediate internal transition to Quest 1
        setActivePhase('quest1');
        setCurrentIndex(0);
      } else {
        // Finished current quest dialogue, move to world map
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

  // Guard against empty dialogue arrays
  if (!currentLine) return null;

  return (
    <div className="dialogue-page-container" style={{ 
      position: 'fixed', inset: 0, backgroundImage: `url(${background})`, 
      backgroundSize: 'cover', transition: 'background-image 1.2s ease-in-out',
      display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      {/* Dark overlay for readability */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1 }} />

      <Modal type="dialogue" style={{ width: "min(95vw, 750px)", zIndex: 10, background: 'rgba(12, 8, 20, 0.98)', border: '1px solid #7c3aed' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
          
          {/* HEADER SECTION: Portrait and Speaker Name */}
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

          {/* MAIN TEXT AREA: Contains the glossary logic */}
          <div style={{ minHeight: '130px', display: 'flex', alignItems: 'flex-start', paddingTop: '10px' }}>
            <div className="dialogue-text-content">
              <HighlightableText
                text={formatDialogueText(currentLine.text)}
                terms={Object.keys(GLOSSARY)}
                onTermClick={handleTermClick}
              />
            </div>
          </div>

          {/* NAVIGATION FOOTER */}
          <div className="dialogue-nav">
            <Button 
              onClick={() => setCurrentIndex(i => i - 1)} 
              disabled={currentIndex === 0}
            >
              ←
            </Button>
            
            <span className="dialogue-counter">
              {activePhase.toUpperCase()} — {currentIndex + 1} / {dialogues.length}
            </span>

            <Button onClick={handleNext}>
              {isLastLine && activePhase !== 'intro' ? "To the Map" : "Next"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Glossary Pop-up */}
      <GlossaryModal
        open={glossaryOpen}
        term={glossaryItem?.term}
        definition={glossaryItem?.definition}
        onClose={() => setGlossaryOpen(false)}
      />
    </div>
  );
}