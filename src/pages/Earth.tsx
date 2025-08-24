import { useEcoProgress } from "@/hooks/useEcoProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RotateCcw } from "lucide-react";

import earthHealthy from "@/assets/earth-healthy.png";
import earthModerate from "@/assets/earth-moderate.png";
import earthWarning from "@/assets/earth-warning.png";
import earthDanger from "@/assets/earth-danger.png";
import earthStarting from "@/assets/earth-starting.png";

const earthImages = {
  healthy: earthHealthy,
  moderate: earthModerate,
  warning: earthWarning,
  danger: earthDanger,
  starting: earthStarting,
};

const earthMessages = {
  healthy: "Excellent! Planet Earth is thriving! 🌍✨",
  moderate: "Good progress! Keep up the great work! 🌱",
  warning: "Earth needs more care. You can do better! ⚠️",
  danger: "Earth is in trouble! Take action now! 🚨",
  starting: "Every journey begins with a first step! 🌱",
};

const Earth = () => {
  const { getProgress, resetWeek, getEarthState, data } = useEcoProgress();
  
  const progress = getProgress();
  const earthState = getEarthState();
  const earthImage = earthImages[earthState];
  const earthMessage = earthMessages[earthState];

  return (
    <div className="container mx-auto px-4 py-6 pb-20 max-w-md">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Planet Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <img 
              src={earthImage} 
              alt={`Earth in ${earthState} state`}
              className="w-64 h-64 mx-auto rounded-full object-cover shadow-lg transition-all duration-500"
            />
          </div>
          
          <div className="space-y-3">
            <div className="text-4xl font-bold text-primary">
              {progress}%
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-lg text-muted-foreground">
              {earthMessage}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold">Completed</div>
              <div className="text-lg font-bold text-primary">
                {data.challenges.filter(c => c.completed).length}/7
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold">Streak</div>
              <div className="text-lg font-bold text-primary">
                {data.streakCount} weeks
              </div>
            </div>
          </div>

          <Button 
            onClick={resetWeek}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Week
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Earth;