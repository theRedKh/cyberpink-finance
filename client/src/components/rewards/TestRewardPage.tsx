import { useState } from 'react';
import { RewardCard
    
 } from './RewardCard';
import type { QuestId } from '../../game/types';
import type { InventoryItem } from '../../game/types';
import React from 'react';

export default function RewardTestPage() {
  // Change this to test different quests
  const [questId] = useState<QuestId>('quest1');

  const [claimedItems, setClaimedItems] = useState<InventoryItem[]>([]);

  const handleClaim = (item: InventoryItem) => {
    console.log('Reward claimed:', item);

    setClaimedItems((prev) => {
      // Prevent duplicate claims
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0010',
        padding: '3rem 1rem',
        fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#ff00ff',
          marginBottom: '2rem',
          textShadow: '0 0 12px rgba(255,0,255,0.8)',
        }}
      >
        Reward System Test Page
      </h1>

      {/* Reward Card Under Test */}
      <RewardCard questId={questId} onClaim={handleClaim} />

      {/* Debug Panel */}
      <div
        style={{
          maxWidth: '600px',
          margin: '3rem auto 0',
          padding: '1rem',
          border: '2px dashed #ff00ff',
          borderRadius: '8px',
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>
          Claimed Rewards (Debug)
        </h3>

        {claimedItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>
            No rewards claimed yet.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {claimedItems.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255,0,255,0.3)',
                }}
              >
                <strong>{item.name}</strong> ({item.type})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
