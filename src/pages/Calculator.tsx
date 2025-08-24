import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator as CalculatorIcon, Lightbulb } from "lucide-react";

interface CalculationResult {
  totalKwh: number;
  totalCO2: number;
  suggestions: string[];
}

const Calculator = () => {
  const [fanHours, setFanHours] = useState("");
  const [acHours, setAcHours] = useState("");
  const [commuteType, setCommuteType] = useState("");
  const [commuteHours, setCommuteHours] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateEmissions = () => {
    const fan = parseFloat(fanHours) || 0;
    const ac = parseFloat(acHours) || 0;
    const commute = parseFloat(commuteHours) || 0;

    // Energy consumption (kWh per hour)
    const fanKwh = fan * 0.075; // 75W fan
    const acKwh = ac * 2.5; // 2.5kW AC
    
    // Transport emissions (kg CO2 per hour)
    const transportEmissions = {
      walk: 0,
      cycle: 0,
      bike: commute * 0.12, // motorcycle
      bus: commute * 0.08,
      car: commute * 0.25,
    };

    const transportCO2 = transportEmissions[commuteType as keyof typeof transportEmissions] || 0;
    
    // Electricity to CO2 (kg CO2 per kWh - average grid)
    const electricityCO2 = (fanKwh + acKwh) * 0.5;
    
    const totalKwh = fanKwh + acKwh;
    const totalCO2 = electricityCO2 + transportCO2;

    const suggestions = [];
    
    if (ac > 6) {
      suggestions.push(`Reduce AC by 2 hours → Save ${(2 * 2.5 * 0.5 * 7).toFixed(1)} kg CO2/week`);
    }
    if (fan > 8) {
      suggestions.push(`Reduce fan by 2 hours → Save ${(2 * 0.075 * 0.5 * 7).toFixed(1)} kg CO2/week`);
    }
    if (commuteType === "car" && commute > 1) {
      suggestions.push(`Switch to bus for 1 hour → Save ${((0.25 - 0.08) * 7).toFixed(1)} kg CO2/week`);
    }
    if (commuteType === "bike" && commute > 1) {
      suggestions.push(`Try cycling instead → Save ${(0.12 * commute * 7).toFixed(1)} kg CO2/week`);
    }
    if (suggestions.length === 0) {
      suggestions.push("Great job! Your carbon footprint is already quite low!");
    }

    setResult({
      totalKwh,
      totalCO2,
      suggestions,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-20 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <CalculatorIcon className="w-6 h-6" />
            Carbon Calculator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Calculate your daily energy usage and carbon footprint
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fan-hours">Hours of Fan Usage</Label>
              <Input
                id="fan-hours"
                type="number"
                placeholder="0"
                value={fanHours}
                onChange={(e) => setFanHours(e.target.value)}
                min="0"
                max="24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ac-hours">Hours of AC Usage</Label>
              <Input
                id="ac-hours"
                type="number"
                placeholder="0"
                value={acHours}
                onChange={(e) => setAcHours(e.target.value)}
                min="0"
                max="24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commute-type">Commute Type</Label>
              <Select value={commuteType} onValueChange={setCommuteType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transport method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk">Walking</SelectItem>
                  <SelectItem value="cycle">Bicycle</SelectItem>
                  <SelectItem value="bike">Motorcycle</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commute-hours">Hours of Commute</Label>
              <Input
                id="commute-hours"
                type="number"
                placeholder="0"
                value={commuteHours}
                onChange={(e) => setCommuteHours(e.target.value)}
                min="0"
                max="12"
              />
            </div>

            <Button onClick={calculateEmissions} className="w-full">
              Calculate Impact
            </Button>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">
                    {result.totalKwh.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">kWh/day</div>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold text-destructive">
                    {result.totalCO2.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">kg CO₂/day</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Suggestions
                </h3>
                <div className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 bg-primary/5 border border-primary/10 rounded-lg text-sm"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;