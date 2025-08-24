import { useEcoProgress } from "@/hooks/useEcoProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

const Challenges = () => {
  const { data, getProgress, toggleChallenge } = useEcoProgress();
  const progress = getProgress();
  const completedCount = data.challenges.filter(c => c.completed).length;

  return (
    <div className="container mx-auto px-4 py-6 pb-20 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Daily Eco Challenges
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-bold">{completedCount}/7 completed</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Complete all 7 to unlock the Weekly Hero badge!
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-start space-x-3 p-3 rounded-lg border transition-colors hover:bg-accent"
              >
                <Checkbox
                  id={challenge.id}
                  checked={challenge.completed}
                  onCheckedChange={() => toggleChallenge(challenge.id)}
                  className="mt-0.5"
                />
                <label
                  htmlFor={challenge.id}
                  className={`flex-1 text-sm leading-6 cursor-pointer transition-all ${
                    challenge.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {challenge.text}
                </label>
              </div>
            ))}
          </div>
          
          {completedCount === 7 && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-center">
                <div className="text-2xl mb-2">🎉</div>
                <h3 className="font-bold text-primary">Congratulations!</h3>
                <p className="text-sm text-muted-foreground">
                  You've completed all challenges this week! You're a Weekly Hero!
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenges;