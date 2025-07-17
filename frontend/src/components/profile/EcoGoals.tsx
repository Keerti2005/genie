
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, CheckCircle, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Goal {
  title: string;
  progress: number;
  target: string;
  current: number;
  total: number;
  icon: React.ComponentType<any>;
}

interface EcoGoalsProps {
  goals: Goal[];
}

export const EcoGoals = ({ goals }: EcoGoalsProps) => {
  const { toast } = useToast();

  const handleAddGoal = () => {
    toast({
      title: "Add New Goal",
      description: "Goal creation feature coming soon!",
    });
  };

  const handleViewDetails = (goalTitle: string) => {
    toast({
      title: "Goal Details",
      description: `Viewing details for "${goalTitle}"`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Your Eco Goals
              </CardTitle>
              <CardDescription>
                Track your progress towards a more sustainable lifestyle
              </CardDescription>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleAddGoal}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <Card key={index} className="border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <goal.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.target}</p>
                      </div>
                    </div>
                    {goal.progress >= 100 ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        In Progress
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {goal.current}/{goal.total}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {goal.progress}% complete
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium text-green-700">
                        {goal.total - goal.current}
                      </span>
                      <span className="text-muted-foreground"> remaining</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(goal.title)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Completed Goals Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Recently Completed Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium">Zero Waste Week</h4>
                  <Badge className="bg-green-600 text-white text-xs">Completed</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Successfully avoided all single-use items for 7 days
                </p>
                <p className="text-xs text-green-700 mt-1">+100 bonus points earned!</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium">Local Supporter</h4>
                  <Badge className="bg-green-600 text-white text-xs">Completed</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Purchased 15 items from local, sustainable brands
                </p>
                <p className="text-xs text-green-700 mt-1">+75 bonus points earned!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};