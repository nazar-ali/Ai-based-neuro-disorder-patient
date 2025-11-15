import dbConnect from "@/lib/mongoose";

// GET: return patients for a doctor and ensure Patient docs exist for patient Users
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const doctorId = params.id; // expecting doctor userId or doctor._id depending on your model

    // Lazy import models to avoid registration issues
    const User = (await import("@/models/User")).default;
    const Patient = (await import("@/models/Patient")).default;
    const Doctor = (await import("@/models/Docters")).default;

    // Try to find doctor record by userId or _id
    let doctorDoc = await Doctor.findOne({ userId: doctorId });
    if (!doctorDoc) doctorDoc = await Doctor.findById(doctorId);

    // 1) Patients assigned to this doctor (by User.assignedDoctor or Patient.assignedDoctor)
    const assignedUsers = await User.find({ role: "patient", assignedDoctor: doctorId }).lean();

    // Ensure each assigned user has a Patient document; create if missing
    const createdPatients = [];
    for (const u of assignedUsers) {
      const exists = await Patient.findOne({ userId: String(u._id) });
      if (!exists) {
        const p = await Patient.create({
          fullName: u.fullName || "",
          userId: String(u._id),
          demographics: {},
          assignedDoctor: doctorDoc ? doctorDoc._id : null,
        });
        createdPatients.push(p);
      }
    }

    // Fetch all Patient docs that reference this doctor
    const patients = await Patient.find({ assignedDoctor: doctorDoc ? doctorDoc._id : null }).populate({ path: 'assignedDoctor', select: 'fullName _id' }).lean();

    // 2) Also find Users with role patient that do not have a Patient document yet (unregistered profiles)
    const usersWithPatientDocs = await Patient.find({}, 'userId').lean();
    const userIdsWithPatient = new Set(usersWithPatientDocs.map((p) => String(p.userId)));

    const usersWithoutPatientDocs = await User.find({ role: 'patient', _id: { $nin: Array.from(userIdsWithPatient) } }).lean();

    // Create Patient docs for those users (do not assign to doctor automatically)
    const newlyCreated = [];
    for (const u of usersWithoutPatientDocs) {
      const p = await Patient.create({
        fullName: u.fullName || '',
        userId: String(u._id),
        demographics: {},
        assignedDoctor: null,
      });
      newlyCreated.push(p);
    }

    return new Response(JSON.stringify({ success: true, assignedCount: patients.length, assigned: patients, createdPatients: createdPatients.length, newlyCreatedCount: newlyCreated.length }), { status: 200 });
  } catch (err) {
    console.error('Error in GET /api/doctors/[id]/patients', err);
    return new Response(JSON.stringify({ success: false, error: err.message || String(err) }), { status: 500 });
  }
}
