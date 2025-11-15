import dbConnect from "@/lib/dbConnect";
import Caretaker from "@/models/Caretaker";
import Patient from "@/models/Patient";
import { authMiddleware } from "@/lib/authMiddleware";
import { allowRoles } from "@/lib/roleMiddleware";

async function handler(req) {
  await dbConnect();

  const { caretakerId, patientId } = await req.json();

  // Assign patient to caretaker
  await Caretaker.findByIdAndUpdate(caretakerId, {
    $addToSet: { assignedPatients: patientId }
  });

  await Patient.findByIdAndUpdate(patientId, {
    assignedCaretaker: caretakerId
  });

  return Response.json({ message: "Caretaker assigned successfully" });
}

export const POST = authMiddleware(allowRoles(["admin"])(handler));
