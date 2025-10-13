"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  MapPin,
  Star,
  Clock,
  Phone,
  CalendarDays,
} from "lucide-react";
import { assets } from "@/assets/assests";
const specialists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Neurologist",
    rating: 4.9,
    experience: "15 years",
    location: "Downtown Medical Center",
    distance: "2.3 miles",
    availability: "Available Today",
    phone: "(555) 123-4567",
    image: assets.caringDoctor,
  },
];

export default function SpecialistPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Specialist Recommendations
        </h2>
        {/* <p className="text-gray-500 text-sm">
          Personalized AI recommendations based on your medical history
        </p> */}
      </div>

      {/* Overview Card */}
      {/* <Card className="border border-gray-100 shadow-sm bg-white/70 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            Recommended Specialists
          </CardTitle>
          <CardDescription className="text-gray-600">
            Based on your medical history and current symptoms, here are
            specialists best suited to assist you.
          </CardDescription>
        </CardHeader>
      </Card> */}

      {/* Specialists List */}
      <div className="grid gap-6  ">
        {specialists.map((specialist) => (
          <Card
            key={specialist.id}
            className="group border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img
                   src={(specialist.image as any).src ?? specialist.image ?? "/placeholder.svg"}
                  alt={specialist.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-100 group-hover:scale-105 transition-transform duration-200"
                />

                <div className="flex-1 space-y-2">
                  {/* Name + Specialty */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {specialist.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        {specialist.specialty}
                      </Badge>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {specialist.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {specialist.experience} experience
                      </p>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm pt-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {specialist.location}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {specialist.distance} away
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Availability</p>
                        <p className="text-gray-500 text-xs">
                          {specialist.availability}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 md:col-span-2">
                      <Phone className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Contact</p>
                        <p className="text-gray-500 text-xs">
                          {specialist.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50">
                      View Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
