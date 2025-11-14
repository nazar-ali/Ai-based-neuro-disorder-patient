"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Upload, FileImage, Zap, Activity } from "lucide-react"
import MriCard from "@/components/common/MriCard"
import RecentAnalysisResult from "@/components/common/RecentAnalysisResult"

export default function MRIPage() {
  
  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 md:px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
       
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <MriCard
            title="Total Scans"
            value="24"
            change="+2 from last month"
            icon={<Brain className="h-6 w-6 text-purple-700" />}
            gradient="from-purple-50 to-purple-100"
          />
          <MriCard
            title="Pending Analysis"
            value="3"
            change="Processing..."
            icon={<FileImage className="h-6 w-6 text-yellow-700" />}
            gradient="from-yellow-50 to-yellow-100"
          />
          <MriCard
            title="AI Accuracy"
            value="94.2%"
            change="+1.2% from last week"
            icon={<Zap className="h-6 w-6 text-emerald-700" />}
            gradient="from-emerald-50 to-emerald-100"
          />
          <MriCard
            title="Urgent Cases"
            value="1"
            change="Requires attention"
            icon={<Activity className="h-6 w-6 text-red-700" />}
            gradient="from-red-50 to-red-100"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-4 flex-1 max-h-full overflow-hidden">
          <div className="flex flex-col border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition min-h-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload New MRI Scan</h3>
            <p className="text-gray-500">Upload DICOM or image files for AI-based analysis</p>
            <div className="flex-1 flex flex-col justify-center items-center rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <Upload className="mx-auto h-4 w-4 text-gray-400" />
              <p className="mt-3 text-sm text-gray-600">Drag & drop files here or click to browse</p>
              <div className="mt-3">
                <Button className="bg-orange-200 shadow-sm hover:bg-primary/90">
                  Choose Files
                </Button>
              </div>
            </div>
          </div>
          <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Analysis Results</CardTitle>
              <CardDescription className="text-gray-500">
                AI-generated findings from recent scans
              </CardDescription>
            </CardHeader>
            <CardContent>  
              <RecentAnalysisResult color="bg-green-500" status="Normal" patientId="1234" time="2 hours ago" />
              <RecentAnalysisResult color="bg-yellow-500" status="Requires Review" patientId="1235" time="4 hours ago" />
              <RecentAnalysisResult color="bg-red-500" status="Urgent" patientId="1236" time="6 hours ago" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
