import { Router } from "express";

import indexRoute from "./index.routes";
import userRoute from "./users/user.routes";
import doctorRoute from "./doctors/doctor.routes";
import tokenValidatorMiddleware from "@src/core/middlewares/token-validator.middleware";
import nurseRoute from "./nurses/nurse.route";
import patientRoute from "./patients/patient.routes";
import emergencyContactRoute from "./emergencyContact/emergencyContact.routes";
import appointmentRoute from "./appointments/appointment.routes";
import vitalSignRoute from "./vitalSign/vitalSign.routes";
import catalogRoute from "./catalogs/catalog.routes";
import medicalHistoryRoute from "./medicalHistory/medicalHistory.routes";
import medicalConsultationRoute from "./medicalConsultation/medicalConsultation.routes";

const apiRouter = Router();

apiRouter.use("/", indexRoute);
apiRouter.use("/users", userRoute);
apiRouter.use("/doctors", tokenValidatorMiddleware, doctorRoute);
apiRouter.use("/nurses", tokenValidatorMiddleware, nurseRoute);
apiRouter.use("/patients", tokenValidatorMiddleware, patientRoute);
apiRouter.use("/emergencyContacts", tokenValidatorMiddleware, emergencyContactRoute);
apiRouter.use("/emergencyContact", tokenValidatorMiddleware, emergencyContactRoute);
apiRouter.use("/appointments", tokenValidatorMiddleware, appointmentRoute);
apiRouter.use("/vitalSigns", tokenValidatorMiddleware, vitalSignRoute);
apiRouter.use("/catalogs", tokenValidatorMiddleware, catalogRoute);
apiRouter.use("/medical-history", tokenValidatorMiddleware, medicalHistoryRoute);
apiRouter.use("/medicalHistory", tokenValidatorMiddleware, medicalHistoryRoute);
apiRouter.use("/medical-consultations", tokenValidatorMiddleware, medicalConsultationRoute);
apiRouter.use("/medicalConsultations", tokenValidatorMiddleware, medicalConsultationRoute);

export default apiRouter;
