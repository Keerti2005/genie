
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  MapPin, 
  CreditCard, 
  Truck, 
  Settings, 
  HelpCircle, 
  LogOut,
  Bell,
  Shield,
  Eye,
  Edit
} from 'lucide-react';

interface UserData {
  name: string;
  email: string;
}

interface AccountSettingsProps {
  userData: UserData;
}

export const AccountSettings = ({ userData }: AccountSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "123 Green Street, Eco City, EC 12345",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      address: "456 Sustainable Ave, Green Town, GT 67890",
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4321",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8765",
      isDefault: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              Personal Information
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={userData.name} 
                disabled={!isEditing}
                className={isEditing ? "border-green-300" : ""}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                value={userData.email} 
                disabled={!isEditing}
                className={isEditing ? "border-green-300" : ""}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              placeholder="+1 (555) 123-4567" 
              disabled={!isEditing}
              className={isEditing ? "border-green-300" : ""}
            />
          </div>
        </CardContent>
      </Card>

      {/* Addresses */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Saved Addresses
            </CardTitle>
            <Button variant="outline" size="sm">
              Add Address
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{address.type}</h4>
                  {address.isDefault && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{address.address}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              Payment Methods
            </CardTitle>
            <Button variant="outline" size="sm">
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{method.type} ending in {method.last4}</h4>
                  {method.isDefault && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Delivery Preferences */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-green-600" />
            Delivery Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Eco-Friendly Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Choose carbon-neutral delivery options when available
                </p>
              </div>
              <Button variant="outline" size="sm" className="bg-green-50 border-green-200">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Minimal Packaging</h4>
                <p className="text-sm text-muted-foreground">
                  Reduce packaging materials when possible
                </p>
              </div>
              <Button variant="outline" size="sm" className="bg-green-50 border-green-200">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Delivery Consolidation</h4>
                <p className="text-sm text-muted-foreground">
                  Group orders to reduce delivery trips
                </p>
              </div>
              <Button variant="outline" size="sm" className="bg-green-50 border-green-200">
                Enabled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-green-600" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Privacy & Security
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Eye className="h-4 w-4 mr-2" />
              Data & Privacy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </Button>
            <Button variant="destructive" className="w-full justify-start mt-4">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};