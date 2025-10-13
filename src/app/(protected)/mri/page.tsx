"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Upload, FileImage, Zap, Activity } from "lucide-react"

export default function MRIPage() {
  return (
    // ✅ Parent container should fill the available height and prevent layout overflow
    <div className="  flex flex-col ">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6  bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Scans"
            value="24"
            change="+2 from last month"
            icon={<Brain className="h-6 w-6 text-purple-700" />}
            gradient="from-purple-50 to-purple-100"
          />
          <StatCard
            title="Pending Analysis"
            value="3"
            change="Processing..."
            icon={<FileImage className="h-6 w-6 text-yellow-700" />}
            gradient="from-yellow-50 to-yellow-100"
          />
          <StatCard
            title="AI Accuracy"
            value="94.2%"
            change="+1.2% from last week"
            icon={<Zap className="h-6 w-6 text-emerald-700" />}
            gradient="from-emerald-50 to-emerald-100"
          />
          <StatCard
            title="Urgent Cases"
            value="1"
            change="Requires attention"
            icon={<Activity className="h-6 w-6 text-red-700" />}
            gradient="from-red-50 to-red-100"
          />
        </div>

        {/* Upload & Results Section */}
       {/* Upload & Results Section */}
<div className="grid md:grid-cols-2 gap-6 mt-4 flex-1 min-h-0 overflow-hidden">
  {/* Upload Section */}
  <div className="flex flex-col border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition min-h-0">
    <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload New MRI Scan</h3>
    <p className="text-gray-500 ">Upload DICOM or image files for AI-based analysis</p>
    <div className="flex-1 flex flex-col justify-center items-center  rounded-xl bg-gray-50 hover:bg-gray-100 transition">
      <Upload className="mx-auto h-4 w-4 text-gray-400" />
      <p className="mt-3 text-sm text-gray-600">
        Drag & drop files here or click to browse
      </p>
      <div className="mt-3">
        <Button className="bg-orange-200  shadow-sm hover:bg-primary/90">
          Choose Files
        </Button>
      </div>
    </div>
  </div>


          {/* Recent Results */}
          <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Analysis Results</CardTitle>
              <CardDescription className="text-gray-500">
                AI-generated findings from recent scans
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <ResultItem color="bg-green-500" status="Normal" patientId="1234" time="2 hours ago" />
              <ResultItem color="bg-yellow-500" status="Requires Review" patientId="1235" time="4 hours ago" />
              <ResultItem color="bg-red-500" status="Urgent" patientId="1236" time="6 hours ago" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ✅ Stat Card Component
function StatCard({ title, value, change, icon, gradient }: any) {
  return (
    <Card className={`overflow-hidden border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br ${gradient}`}>
      <CardHeader className="flex flex-row items-center justify-between ">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        <div className="p-2 bg-white/60 rounded-lg shadow">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-600">{change}</p>
      </CardContent>
    </Card>
  )
}

// ✅ Result List Item Component
function ResultItem({ color, status, patientId, time }: any) {
  return (
    <div className="flex items-center gap-4 p-1 rounded-lg hover:bg-gray-50 transition">
      <div className={`w-3 h-3 ${color} rounded-full`}></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">
          Patient #{patientId} - {status}
        </p>
        <p className="text-xs text-gray-500">Analyzed {time}</p>
      </div>
    </div>
  )
}
