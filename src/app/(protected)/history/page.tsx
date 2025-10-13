"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Calendar, FileText, Download, Eye, User } from "lucide-react"

const medicalHistory = [
  {
    id: 1,
    date: "2024-01-15",
    type: "MRI Scan",
    description: "Brain MRI - Routine checkup",
    status: "Completed",
    doctor: "Dr. Sarah Johnson",
    results: "Normal findings",
    files: ["mri_scan_001.dcm", "report_001.pdf"],
  },
]

export default function HistoryPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6 space-y-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Medical History</h2>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Info Card */}
      {/* <Card className="border border-gray-200/50 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <History className="h-5 w-5 text-blue-600" />
            Your Medical Records
          </CardTitle>
          <CardDescription className="text-gray-600">
            Complete log of your appointments, lab tests, and reports.
          </CardDescription>
        </CardHeader>
      </Card> */}

      {/* Medical Records */}
      {medicalHistory.length > 0 ? (
        <div className="grid gap-5">
          {medicalHistory.map((record) => (
            <Card
              key={record.id}
              className="group border border-gray-200/60 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardContent className="p-6 space-y-4">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center flex-wrap gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <Badge
                        variant={record.status === "Completed" ? "default" : "secondary"}
                        className="rounded-full text-xs"
                      >
                        {record.status}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">{record.type}</h3>
                    <p className="text-gray-600 text-sm">{record.description}</p>
                  </div>

                  <div className="flex flex-row gap-2 items-center md:items-end">
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Doctor</p>
                      <p className="text-gray-600">{record.doctor}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Results</p>
                    <p className="text-gray-600">{record.results}</p>
                  </div>
                </div>

                {/* Attached Files */}
                {record.files?.length > 0 && (
                  <div className="pt-2">
                    <p className="font-medium text-gray-800 text-sm mb-2">Attached Files</p>
                    <div className="flex flex-wrap gap-2">
                      {record.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 cursor-pointer transition"
                        >
                          <FileText className="h-3.5 w-3.5 text-gray-500" />
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center bg-white/80 border border-dashed border-gray-200">
          <CardContent className="space-y-2">
            <History className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-gray-600 text-sm">No medical history found.</p>
            <p className="text-gray-500 text-xs">
              Your previous appointments and reports will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
