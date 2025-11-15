import dbConnect from "@/lib/mongoose";

// POST: assign a patient to a doctor (updates User.assignedDoctor, Patient.assignedDoctor and Doctor.assignedPatients)
export async function POST(req, { params }) {
  try {
    await dbConnect();

    const doctorId = params.id; // expecting doctor userId or doctor._id
    const body = await req.json();
    const { patientId } = body;
    if (!patientId) return new Response(JSON.stringify({ success: false, error: 'patientId required' }), { status: 400 });

    const User = (await import("@/models/User")).default;
    const Patient = (await import("@/models/Patient")).default;
    const Doctor = (await import("@/models/Docters")).default;

    // Find doctor record
    let doctorDoc = await Doctor.findOne({ userId: doctorId });
    if (!doctorDoc) doctorDoc = await Doctor.findById(doctorId);

    // Update User.assignedDoctor
    await User.findByIdAndUpdate(patientId, { assignedDoctor: doctorId });

    // Ensure Patient exists and set assignedDoctor
    const pat = await Patient.findOneAndUpdate({ userId: String(patientId) }, { $set: { assignedDoctor: doctorDoc ? doctorDoc._id : null } }, { upsert: true, new: true });

    // Add to Doctor.assignedPatients (store patient user ObjectId)
    if (doctorDoc) {
      await Doctor.findByIdAndUpdate(doctorDoc._id, { $addToSet: { assignedPatients: pat.userId } });
    }

    return new Response(JSON.stringify({ success: true, message: 'Patient assigned', patient: pat }), { status: 200 });
  } catch (err) {
    console.error('Error assigning patient to doctor', err);
    return new Response(JSON.stringify({ success: false, error: err.message || String(err) }), { status: 500 });
  }
}
