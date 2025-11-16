"use client";

import React, { useEffect, useState } from "react";

interface Patient {
  _id: string;
  fullName?: string;
  userId?: string;
  assignedDoctor?: any;
}

export default function DoctorPatients({ doctorId }: { doctorId: string }) {
  const [assigned, setAssigned] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchPatients() {
    setLoading(true);
    try {
      const res = await fetch(`/api/doctors/${doctorId}/patients`);
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(null);
        setAssigned(data.assigned || []);
      } else {
        setMessage(data.error || "Failed to load patients");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (doctorId) fetchPatients();
  }, [doctorId]);

  async function handleAssign(patientUserId: string) {
    try {
      const res = await fetch(`/api/doctors/${doctorId}/assign-patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: patientUserId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("Patient assigned successfully");
        // refresh
        fetchPatients();
      } else {
        setMessage(data.error || "Failed to assign patient");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Assigned Patients</h2>
      {message && <p className="text-sm text-red-600">{message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {assigned.length === 0 && <li className="text-sm">No patients assigned.</li>}
          {assigned.map((p) => (
            <li key={p._id} className="p-2 border rounded-md flex justify-between items-center">
              <div>
                <div className="font-medium">{p.fullName || p.userId || "Unnamed"}</div>
                <div className="text-xs text-gray-500">User: {p.userId}</div>
              </div>
              <div>
                {/* doctor may assign themselves if unassigned; show Assign button when assignedDoctor is null */}
                {!p.assignedDoctor && (
                  <button onClick={() => handleAssign(p.userId || p._id)} className="bg-teal-600 text-white px-3 py-1 rounded">
                    Assign to me
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
