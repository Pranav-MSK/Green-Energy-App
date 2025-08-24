import { useState, useEffect } from "react";

export interface Challenge {
  id: string;
  text: string;
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface EcoData {
  challenges: Challenge[];
  badges: Badge[];
  weekStartDate: string;
  streakCount: number;
}

const defaultChallenges: Challenge[] = [
  { id: "1", text: "Use public transport or walk/bicycle instead of driving", completed: false },
  { id: "2", text: "Turn off electronics when not in use", completed: false },
  { id: "3", text: "Go a whole day without single-use plastic", completed: false },
  { id: "4", text: "Take shorter showers (under 5 minutes) to save water", completed: false },
  { id: "5", text: "Use a reusable water bottle", completed: false },
  { id: "6", text: "Plant a seed or care for a small plant at home", completed: false },
  { id: "7", text: "Use natural light during the day instead of switching on bulbs", completed: false },
];

const defaultBadges: Badge[] = [
  {
    id: "first-step",
    name: "First Step",
    description: "Complete your first eco challenge",
    icon: "badge-first-step",
    unlocked: false,
  },
  {
    id: "weekly-hero",
    name: "Weekly Hero",
    description: "Complete all 7 challenges in a week",
    icon: "badge-weekly-hero",
    unlocked: false,
  },
  {
    id: "streak-starter",
    name: "Streak Starter",
    description: "Complete 2 weeks in a row",
    icon: "badge-streak-starter",
    unlocked: false,
  },
    {
    id: "plastic-free",
    name: "Plastic-Free",
    description: "Go a whole day without single-use plastic",
    icon: "badge-plastic-free",
    unlocked: false,
  },
  {
    id: "water-saver",
    name: "Water Saver",
    description: "Take 5 short showers in a row",
    icon: "badge-water-saver",
    unlocked: false,
  },
  {
    id: "green-thumb",
    name: "Green Thumb",
    description: "Plant a seed or care for a plant",
    icon: "badge-green-thumb",
    unlocked: false,
  },
  {
    id: "energy-saver",
    name: "Energy Saver",
    description: "Turn off lights/electronics for 3 days straight",
    icon: "badge-energy-saver",
    unlocked: false,
  },
  {
    id: "eco-warrior",
    name: "Eco Warrior",
    description: "Complete 20 eco challenges in total",
    icon: "badge-eco-warrior",
    unlocked: false,
  },
];

export const useEcoProgress = () => {
  const [data, setData] = useState<EcoData>(() => {
    const saved = localStorage.getItem("eco-progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        challenges: parsed.challenges || defaultChallenges,
        badges: parsed.badges || defaultBadges,
      };
    }
    return {
      challenges: defaultChallenges,
      badges: defaultBadges,
      weekStartDate: new Date().toISOString(),
      streakCount: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem("eco-progress", JSON.stringify(data));
  }, [data]);

  const getProgress = () => {
    const completed = data.challenges.filter(c => c.completed).length;
    return Math.round((completed / data.challenges.length) * 100);
  };

  const toggleChallenge = (id: string) => {
    setData(prev => {
      const newChallenges = prev.challenges.map(c => 
        c.id === id ? { ...c, completed: !c.completed } : c
      );
      
      const completedCount = newChallenges.filter(c => c.completed).length;
      const newBadges = [...prev.badges];
      
      // Check for First Step badge
      if (completedCount >= 1 && !newBadges.find(b => b.id === "first-step")?.unlocked) {
        const firstStepIndex = newBadges.findIndex(b => b.id === "first-step");
        if (firstStepIndex !== -1) {
          newBadges[firstStepIndex] = { ...newBadges[firstStepIndex], unlocked: true };
        }
      }
      
      // Check for Weekly Hero badge
      if (completedCount === 7 && !newBadges.find(b => b.id === "weekly-hero")?.unlocked) {
        const weeklyHeroIndex = newBadges.findIndex(b => b.id === "weekly-hero");
        if (weeklyHeroIndex !== -1) {
          newBadges[weeklyHeroIndex] = { ...newBadges[weeklyHeroIndex], unlocked: true };
        }
      }
      
      return {
        ...prev,
        challenges: newChallenges,
        badges: newBadges,
      };
    });
  };

  const resetWeek = () => {
    setData(prev => {
      const allCompleted = prev.challenges.every(c => c.completed);
      const newStreakCount = allCompleted ? prev.streakCount + 1 : 0;
      
      const newBadges = [...prev.badges];
      
      // Check for Streak Starter badge
      if (newStreakCount >= 2 && !newBadges.find(b => b.id === "streak-starter")?.unlocked) {
        const streakIndex = newBadges.findIndex(b => b.id === "streak-starter");
        if (streakIndex !== -1) {
          newBadges[streakIndex] = { ...newBadges[streakIndex], unlocked: true };
        }
      }
      
      return {
        ...prev,
        challenges: defaultChallenges,
        badges: newBadges,
        weekStartDate: new Date().toISOString(),
        streakCount: newStreakCount,
      };
    });
  };

  const getEarthState = () => {
    const progress = getProgress();
    if (progress === 0) return "starting";
    if (progress < 30) return "danger";
    if (progress < 60) return "warning";
    if (progress < 85) return "moderate";
    return "healthy";
  };

  return {
    data,
    getProgress,
    toggleChallenge,
    resetWeek,
    getEarthState,
  };
};