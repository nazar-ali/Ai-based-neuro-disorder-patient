"use client"

import { Bell, CheckCircle, Clock, AlertTriangle, Calendar, Pill } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/utils"

interface Notification {
  id: number
  title: string
  patient: string
  time: string
  icon: React.ReactNode
  type: "alert" | "info" | "reminder"
}

export default function NotificationsPage() {
  const today: Notification[] = [
    {
      id: 1,
      title: "MRI Scan Analysis Complete",
      patient: "Emily Carter",
      time: "9:00 AM",
      icon: <CheckCircle className="text-green-500" size={22} />,
      type: "info",
    },
    {
      id: 2,
      title: "Medication Reminder",
      patient: "David Lee",
      time: "10:30 AM",
      icon: <Pill className="text-blue-500" size={22} />,
      type: "reminder",
    },
  ]

  const yesterday: Notification[] = [
    {
      id: 3,
      title: "Appointment Scheduled",
      patient: "Sarah Johnson",
      time: "2:15 PM",
      icon: <Calendar className="text-purple-500" size={22} />,
      type: "info",
    },
    // {
    //   id: 4,
    //   title: "Unusual Behavior Detected",
    //   patient: "Michael Chen",
    //   time: "4:45 PM",
    //   icon: <AlertTriangle className="text-red-500" size={22} />,
    //   type: "alert",
    // },
  ]

  return (
    <div className="flex-1  md:p-4 bg-gradient-to-b from-muted/40 via-background to-background rounded-lg ">
      {/* Header */}
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="text-blue-500 h-7 w-7" />
            Notifications & Alerts
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Stay updated with patient monitoring, reminders, and AI-detected alerts.
          </p>
        </div>
      </div>

      <Separator /> */}

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50 rounded-lg w-2/3 border border-gray-200 shadow-lg ">
          <TabsTrigger value="all" className="data-[state=active]:bg-background p-3 data-[state=active]:text-primary">
            All
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-background p-3 data-[state=active]:text-primary">
            Alerts
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-background p-3 data-[state=active]:text-primary">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-2 ">
          <NotificationGroup title="Today" data={today} />
          <NotificationGroup title="Yesterday" data={yesterday} />
        </TabsContent>

        <TabsContent value="alerts" className="mt-2 ">
          <NotificationGroup title="Critical Alerts" data={yesterday.filter((n) => n.type === "alert")} />
        </TabsContent>

        <TabsContent value="notifications" className="mt-2 ">
          <NotificationGroup
            title="Reminders & Updates"
            data={[...today, ...yesterday].filter((n) => n.type !== "alert")}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationGroup({ title, data }: { title: string; data: Notification[] }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground/90 ">{title}</h2>
      <div className="grid gap-4">
        {data.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "transition-all duration-200 border-l-4 hover:shadow-md hover:translate-y-[1px]",
              item.type === "alert"
                ? "border-l-red-500/80"
                : item.type === "reminder"
                ? "border-l-blue-500/70"
                : "border-l-green-500/60"
            )}
          >
            <CardContent className="flex items-center gap-4 ">
              <div className="flex items-center justify-center rounded-full bg-secondary/40 w-12 h-12 shrink-0">
                {item.icon}
              </div>

              <div className="flex-1">
                <p className="font-medium text-base text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">Patient: {item.patient}</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    item.type === "alert"
                      ? "destructive"
                      : item.type === "reminder"
                      ? "secondary"
                      : "default"
                  }
                >
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">{item.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.length === 0 && (
          <Card className="p-6 text-center text-muted-foreground">No notifications found.</Card>
        )}
      </div>
    </section>
  )
}
