import { useEcoProgress } from "@/hooks/useEcoProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

import badgeFirstStep from "@/assets/badge-first-step.png";
import badgeWeeklyHero from "@/assets/badge-weekly-hero.png";
import badgeStreakStarter from "@/assets/badge-streak-starter.png";
import badgePlasticFree from "@/assets/badge-plastic-free.png";
import badgeWaterSaver from "@/assets/badge-water-saver.png";
import badgeGreenThumb from "@/assets/badge-green-thumb.png";
import badgeEnergySaver from "@/assets/badge-energy-saver.png";
import badgeEcoWarrior from "@/assets/badge-eco-warrior.png";

const badgeImages = {
  "badge-first-step":badgeFirstStep,
  "badge-weekly-hero": badgeWeeklyHero,
  "badge-streak-starter": badgeStreakStarter,
  "badge-plastic-free": badgePlasticFree,
  "badge-water-saver": badgeWaterSaver,
  "badge-green-thumb": "",//badgeGreenThumb,
  "badge-energy-saver": "",//badgeEnergySaver,
  "badge-eco-warrior": "",//badgeEcoWarrior,
};

const Badges = () => {
  const { data } = useEcoProgress();
  const unlockedCount = data.badges.filter(b => b.unlocked).length;

  return (
    <div className="container mx-auto px-4 py-6 pb-20 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Achievement Badges
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {unlockedCount}/{data.badges.length} badges earned
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {data.badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "p-4 rounded-lg border transition-all",
                  badge.unlocked
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/50 border-muted opacity-60"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={badgeImages[badge.icon as keyof typeof badgeImages]}
                      alt={badge.name}
                      className={cn(
                        "w-16 h-16 rounded-full object-cover transition-all",
                        badge.unlocked ? "shadow-lg" : "grayscale opacity-50"
                      )}
                    />
                    {!badge.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-bold text-lg",
                      badge.unlocked ? "text-primary" : "text-muted-foreground"
                    )}>
                      {badge.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {badge.description}
                    </p>
                    {badge.unlocked && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          <Trophy className="w-3 h-3" />
                          Unlocked
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {unlockedCount === 0 && (
            <div className="mt-6 p-4 text-center bg-muted/30 rounded-lg border border-muted">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-semibold text-muted-foreground">No badges yet</h3>
              <p className="text-sm text-muted-foreground">
                Complete your first eco challenge to unlock your first badge!
              </p>
            </div>
          )}

          {unlockedCount > 0 && unlockedCount < data.badges.length && (
            <div className="mt-6 p-4 text-center bg-primary/5 rounded-lg border border-primary/10">
              <div className="text-2xl mb-2">🌟</div>
              <h3 className="font-semibold text-primary">Keep Going!</h3>
              <p className="text-sm text-muted-foreground">
                You're doing great! Complete more challenges to unlock all badges.
              </p>
            </div>
          )}

          {unlockedCount === data.badges.length && (
            <div className="mt-6 p-4 text-center bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="font-bold text-primary">Badge Master!</h3>
              <p className="text-sm text-muted-foreground">
                Congratulations! You've unlocked all available badges!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Badges;

/*
import { useEcoProgress } from "@/hooks/useEcoProgress";

const Badges = () => {
  const { data } = useEcoProgress();
  const unlockedCount = data.badges.filter(b => b.unlocked).length;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">Badges</h2>
      <p className="text-sm mb-4">
        {unlockedCount}/{data.badges.length} earned
      </p>

      {data.badges.map((badge) => (
        <div key={badge.id} className="border p-3 mb-2 rounded">
          <div className="flex gap-3 items-center">
            <img
              src={badgeImages[badge.icon as keyof typeof badgeImages]}
              alt={badge.name}
              className="w-12 h-12"
            />
            <div>
              <p className="font-medium">
                {badge.name} {badge.unlocked ? "🏆" : "🔒"}
              </p>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Badges;*/