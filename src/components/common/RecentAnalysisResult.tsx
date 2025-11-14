type RecentAnalysisResultProps = {
  color: string
  status: string
  patientId: string | number
  time: string
}

const RecentAnalysisResult = ({ color, status, patientId, time }: RecentAnalysisResultProps) => (
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

  export default RecentAnalysisResult