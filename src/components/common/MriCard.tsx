import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"


type MriCardProps = {
  title: string
  value: string
  change: string
  icon: ReactNode
  gradient: string
}
const MriCard = ({ title, value, change, icon, gradient }: MriCardProps) => (
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

  export default MriCard