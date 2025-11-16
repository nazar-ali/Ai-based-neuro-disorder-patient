import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { authMiddleware } from "@/lib/authMiddleware";
import { allowRoles } from "@/lib/roleMiddleware";

async function handler(req) {
  await dbConnect();

  const { doctorId, patientId } = await req.json();

  // ✔ Validate doctor exists & has role="doctor"
  const doctor = await User.findOne({ _id: doctorId, role: "doctor" });
  if (!doctor) {
    return Response.json({ error: "Invalid doctor ID" }, { status: 400 });
  }

  // ✔ Validate patient exists & has role="patient"
  const patient = await User.findOne({ _id: patientId, role: "patient" });
  if (!patient) {
    return Response.json({ error: "Invalid patient ID" }, { status: 400 });
  }

  // ✔ Assign patient inside doctor record
  await User.findByIdAndUpdate(doctorId, {
    $addToSet: { assignedPatients: patientId },
  });

  // ✔ Assign doctor inside patient record
  await User.findByIdAndUpdate(patientId, {
    assignedDoctor: doctorId,
  });

  return Response.json({
    success: true,
    message: "Patient assigned to doctor successfully",
  });
}

export const POST = authMiddleware(allowRoles(["admin"])(handler));
