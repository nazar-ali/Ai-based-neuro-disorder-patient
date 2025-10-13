import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, MapPin, Upload, Camera } from "lucide-react";

interface ProfileCardProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
  };
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <div className="flex items-start gap-3 text-sm">
      <div className="mt-[2px] text-blue-500">{icon}</div>
      <div>
        <p className="font-medium text-gray-700">{label}</p>
        <p className="text-gray-500">{value}</p>
      </div>
    </div>
  );

  return (
    <Card className="shadow-lg border border-gray-100 rounded-2xl bg-gradient-to-b from-white to-gray-50 hover:shadow-xl transition-all duration-300">
      {/* Profile Header */}
      <CardHeader className="flex flex-col items-center text-center pt-6 pb-3">
        <div className="relative w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center mb-4 shadow-sm">
          <User className="h-14 w-14 text-blue-600" />
          <button
            className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 transition"
            title="Change photo"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {profile.firstName} {profile.lastName}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 font-medium">
          Patient ID: #P001234
        </CardDescription>
      </CardHeader>

      {/* Profile Details */}
      <CardContent className="space-y-5 px-6 pb-6">
        <InfoRow icon={<Mail size={16} />} label="Email" value={profile.email} />
        <InfoRow icon={<Phone size={16} />} label="Phone" value={profile.phone} />
        <InfoRow
          icon={<Calendar size={16} />}
          label="Date of Birth"
          value={new Date(profile.dateOfBirth).toLocaleDateString()}
        />
        <InfoRow icon={<MapPin size={16} />} label="Address" value={profile.address} />

        {/* Upload Section */}
        <div className="border-t border-gray-200 pt-4">
          <label className="text-xs uppercase tracking-wide text-gray-500 block mb-2">
            Profile Photo
          </label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                <Upload className="h-4 w-4 text-gray-500" />
              </div>
              <span className="text-sm text-gray-600">No photo uploaded</span>
            </div>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
              Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
