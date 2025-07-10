
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Award, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface UserData {
  name: string;
  email: string;
  avatar: string;
  level: string;
  levelProgress: number;
  totalPoints: number;
  nextLevelPoints: number;
  memberSince: string;
  totalOrders: number;
  ecoOrders: number;
}

interface ProfileHeaderProps {
  userData: UserData;
}

export const ProfileHeader = ({ userData }: ProfileHeaderProps) => {
  const { toast } = useToast();

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing feature coming soon!",
    });
  };

  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-green-200">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-green-900">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">Member since {userData.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Level and Progress */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                {userData.level}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-200 hover:bg-green-50"
                onClick={handleEditProfile}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progress to next level</span>
                <span className="text-sm text-muted-foreground">
                  {userData.totalPoints}/{userData.nextLevelPoints} points
                </span>
              </div>
              <Progress value={userData.levelProgress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {userData.nextLevelPoints - userData.totalPoints} points until next level
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-green-700 text-lg">{userData.totalPoints}</div>
                <div className="text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-700 text-lg">{userData.totalOrders}</div>
                <div className="text-muted-foreground">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-700 text-lg">{userData.ecoOrders}</div>
                <div className="text-muted-foreground">Eco Orders</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};