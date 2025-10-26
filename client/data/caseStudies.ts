import type { CaseStudy, CaseSummary } from "@shared/api";

const caseStore = new Map<string, CaseStudy>();

const defaultCaseStudies: CaseStudy[] = [
  {
    id: "scad-artery-dissect",
    title: "Case #8921: High-Risk Spontaneous Coronary Artery Dissection",
    author: "Eleanor Pena",
    shortDescription:
      "42 y/o female, postpartum, sudden chest pain with inconclusive ECG. Coronary CTA confirmed mid-LAD SCAD.",
    abstractSummary:
      "A postpartum patient presented with sudden ischemic chest pain and non-diagnostic ECG findings. Serial troponins rose rapidly and coronary CTA revealed a mid-LAD spontaneous dissection. Conservative management was weighed against percutaneous intervention due to hemodynamic stability and preserved TIMI flow.",
    initialPresentation:
      "The patient reported crushing retrosternal pain radiating to the left arm within 48 hours of delivery. ECG showed minimal ST-depressions without reciprocal changes, and initial troponin was mildly elevated. Bedside transthoracic echo indicated preserved LV function but subtle apical hypokinesis.",
    keyChallenge:
      "Balancing the risks of intervention in spontaneous coronary artery dissection with the danger of progression. The team debated whether to proceed with immediate PCI, conservative management, or hybrid imaging-guided stenting given the delicate arterial wall.",
    collaborativeInsights:
      "Emergent coronary CTA confirmed a type 2 SCAD in the mid-LAD with TIMI 3 flow. A heart team conference, including interventional cardiology and maternal-fetal specialists, recommended conservative therapy with anticoagulation avoidance, beta-blockade, and close telemetry monitoring. Serial imaging guided decision-making, preventing unnecessary stent placement.",
    finalDiagnosis:
      "Spontaneous coronary artery dissection (SCAD) of the mid-LAD precipitated by peripartum hormonal changes. Managed conservatively with hemodynamic stabilization and meticulous blood pressure control.",
    patientOutcome:
      "Symptoms resolved within 48 hours and repeat CTA after 7 days showed partial healing. The patient was discharged with cardiac rehab and lifestyle counseling. Three-month follow-up revealed complete vessel remodeling and no recurrence.",
    attachments: [
      { name: "cta_coronary_scad.dcm", type: "image", size: "18.4 MB" },
      { name: "troponin_trend.xlsx", type: "data", size: "96 KB" },
      { name: "discharge_plan.pdf", type: "document", size: "540 KB" },
    ],
  },
  {
    id: "submassive-pe-ctpa",
    title: "Case #7633: Hemodynamically Stable Submassive Pulmonary Embolism",
    author: "Eleanor Pena",
    shortDescription:
      "55 y/o female with acute dyspnea; CT pulmonary angiogram showed bilateral lobar PE with RV strain.",
    abstractSummary:
      "A middle-aged patient presented with sudden shortness of breath and pleuritic chest pain. CT pulmonary angiography revealed bilateral lobar emboli with evidence of right ventricular strain. The multidisciplinary team debated catheter-directed therapy versus anticoagulation alone given intermediate risk features.",
    initialPresentation:
      "On arrival, vitals showed tachycardia (HR 112) and mild hypotension (BP 102/64). Oxygen saturation was 89% on room air. ECG displayed new incomplete RBBB and T-wave inversions in V1-V3. Bedside echo showed RV:LV ratio of 1.2.",
    keyChallenge:
      "Selecting the optimal reperfusion strategy in a submassive PE. The question centered on balancing bleeding risk against preventing clinical deterioration in a patient showing early RV strain but stable hemodynamics.",
    collaborativeInsights:
      "Pulmonology, cardiology, and ICU teams considered systemic thrombolysis, catheter-directed thrombolysis (CDT), or anticoagulation alone. Based on PESI score and contraindications to systemic lytics, CDT with low-dose tPA via ultrasound-facilitated catheter was selected. The approach rapidly improved RV performance while limiting bleeding risk.",
    finalDiagnosis:
      "Intermediate-high risk pulmonary embolism secondary to lower-extremity deep vein thrombosis, managed with catheter-directed thrombolysis and subsequent DOAC therapy.",
    patientOutcome:
      "Within 12 hours of CDT, the patient’s oxygenation normalized and RV function improved. She transitioned to oral anticoagulation and was discharged on day 4. A 3-month follow-up showed resolution of clot burden and restored exercise tolerance.",
    attachments: [
      { name: "ctpa_lobar_pe.dcm", type: "image", size: "22.7 MB" },
      { name: "echo_rvstrain.mp4", type: "video", size: "38.2 MB" },
      { name: "pe_management_plan.pdf", type: "document", size: "602 KB" },
    ],
  },
  {
    id: "myocarditis-vs-takotsubo",
    title: "Case #5412: Viral Myocarditis Mimicking Takotsubo Cardiomyopathy",
    author: "Eleanor Pena",
    shortDescription:
      "38 y/o male with chest pain post-viral illness; cardiac MRI differentiated fulminant myocarditis from stress cardiomyopathy.",
    abstractSummary:
      "A young adult developed acute chest pain and elevated troponins following a viral prodrome. Initial imaging suggested apical ballooning, raising concern for Takotsubo cardiomyopathy. Advanced cardiac MRI revealed diffuse myocardial edema and late gadolinium enhancement consistent with myocarditis, guiding immunomodulatory therapy.",
    initialPresentation:
      "The patient presented with chest tightness, low-grade fever, and palpitations. ECG showed diffuse ST elevations with PR depression. Troponin I was markedly elevated (12.4 ng/mL). Point-of-care echo suggested apical hypokinesis with preserved basal segments.",
    keyChallenge:
      "Distinguishing between Takotsubo cardiomyopathy and viral myocarditis to tailor treatment. The team needed to decide on endomyocardial biopsy versus advanced imaging while the patient remained hemodynamically stable but highly symptomatic.",
    collaborativeInsights:
      "Cardiac MRI demonstrated patchy subepicardial late gadolinium enhancement in the inferolateral wall and elevated native T1/T2 values, confirming active myocarditis. With infectious disease input, the patient received targeted antiviral therapy, high-dose NSAIDs, and close telemetry monitoring, avoiding unnecessary catheterization.",
    finalDiagnosis:
      "Acute viral myocarditis secondary to parvovirus B19 infection, presenting with features overlapping Takotsubo cardiomyopathy.",
    patientOutcome:
      "Symptoms improved within 72 hours and biomarkers trended down. Repeat MRI at 8 weeks showed resolution of edema and improved ejection fraction from 45% to 58%. The patient resumed normal activity with continued outpatient follow-up.",
    attachments: [
      { name: "cmr_myocarditis_lge.dcm", type: "image", size: "16.5 MB" },
      { name: "viral_panel_results.pdf", type: "document", size: "420 KB" },
      { name: "followup_echo.mp4", type: "video", size: "24.1 MB" },
    ],
  },
];

const additionalCaseStudies: CaseStudy[] = [
  {
    id: "ai-guided-angioplasty",
    title: "Case #9124: AI-Guided Complex Angioplasty",
    author: "Eleanor Pena",
    shortDescription:
      "67 y/o male with diffuse triple-vessel disease where intravascular imaging and AI planning supported hybrid revascularisation.",
    abstractSummary:
      "A high-risk surgical candidate with diffuse coronary artery disease required precision planning to avoid repeat CABG. AI-assisted vessel reconstruction suggested a hybrid approach combining rotational atherectomy with cryo-angioplasty to optimise stent placement.",
    initialPresentation:
      "Patient presented with crescendo angina despite maximal medical therapy. Coronary angiography revealed calcified lesions in the proximal LAD and obtuse marginal branches. Left ventricular function was moderately reduced at 40%.",
    keyChallenge:
      "Designing a safe revascularisation plan with minimal contrast load for a patient with chronic kidney disease stage III, while addressing heavy calcification unamenable to standard PCI.",
    collaborativeInsights:
      "Heart team leveraged AI-derived 3D vessel models to map lesion severity. Interventional experts combined rotational atherectomy with cryo-angioplasty before DES deployment, minimising contrast and procedural time.",
    finalDiagnosis:
      "Diffuse calcific multi-vessel coronary artery disease successfully treated with image-guided hybrid PCI, avoiding repeat bypass surgery.",
    patientOutcome:
      "The patient was discharged on day 2 with improved anginal threshold. At 6-week review, perfusion imaging showed markedly improved flow with stable renal function.",
    attachments: [
      { name: "ivus_pre_post.mp4", type: "video", size: "32.4 MB" },
      { name: "revascularisation_plan.pdf", type: "document", size: "780 KB" },
    ],
  },
  {
    id: "sepsis-induced-cardiomyopathy",
    title: "Case #1043: Sepsis-Induced Cardiomyopathy With ECMO Bridge",
    author: "Eleanor Pena",
    shortDescription:
      "48 y/o female with septic shock and biventricular failure bridged with VA-ECMO and immunomodulation.",
    abstractSummary:
      "A patient in septic shock from pneumonia developed fulminant cardiomyopathy requiring rapid mechanical circulatory support. Coordinated ECMO initiation and cytokine adsorption stabilised haemodynamics ahead of definitive infection control.",
    initialPresentation:
      "Presented with fever, hypotension (MAP 52 mmHg), and rising lactate. Bedside echo revealed EF 25% with RV dilation. Blood cultures grew Streptococcus pneumoniae.",
    keyChallenge:
      "Preventing multi-organ failure by rapidly supporting circulation while limiting ECMO-related complications and addressing the infectious source.",
    collaborativeInsights:
      "Critical care, cardiology, and infectious disease teams initiated VA-ECMO with concomitant cytokine adsorption. Early bronchoscopy aided source control, and targeted antibiotics plus low-dose steroids improved shock reversal.",
    finalDiagnosis:
      "Severe sepsis-induced cardiomyopathy secondary to pneumococcal pneumonia, stabilised with temporary VA-ECMO and immunomodulatory therapy.",
    patientOutcome:
      "Cardiac function recovered to EF 55% by day 10, allowing ECMO decannulation. Patient discharged home on week 3 with tailored cardiac rehab plan.",
    attachments: [
      { name: "ecmo_setup_checklist.pdf", type: "document", size: "365 KB" },
      { name: "echo_recovery_series.mp4", type: "video", size: "28.9 MB" },
      { name: "lab_trend_sheet.xlsx", type: "data", size: "112 KB" },
    ],
  },
  {
    id: "transcatheter-tricuspid-repair",
    title: "Case #1187: Transcatheter Tricuspid Valve Repair",
    author: "Eleanor Pena",
    shortDescription:
      "74 y/o female with torrential TR unsuitable for surgery underwent TriClip repair with intra-procedural echo guidance.",
    abstractSummary:
      "A frail patient with isolated tricuspid regurgitation faced prohibitive surgical risk. Multimodal imaging guided transcatheter edge-to-edge repair, significantly reducing regurgitation while avoiding sternotomy.",
    initialPresentation:
      "Symptoms of progressive ascites, peripheral edema, and hepatic congestion. TTE showed torrential TR with annular dilation; RV function mildly impaired. STS score indicated >10% operative mortality.",
    keyChallenge:
      "Achieving leaflet coaptation via a transcatheter approach in a massively dilated tricuspid annulus while preserving conduction system integrity.",
    collaborativeInsights:
      "Structural heart team utilised 3D TEE and intracardiac echo to guide dual clip deployment. Anaesthesia managed hemodynamics meticulously, and right heart catheterisation confirmed improved pressures immediately post-procedure.",
    finalDiagnosis:
      "Isolated torrential functional tricuspid regurgitation successfully managed with transcatheter edge-to-edge repair using dual TriClips.",
    patientOutcome:
      "At 30-day follow-up, the patient reported NYHA class II symptoms with marked reduction in edema and improved hepatic indices.",
    attachments: [
      { name: "tricuspid_clip_plan.pdf", type: "document", size: "690 KB" },
      { name: "post_tee_results.jpg", type: "image", size: "3.2 MB" },
    ],
  },
];

defaultCaseStudies.forEach((study) => {
  caseStore.set(study.id, study);
});

let additionalRegistered = false;

export const registerCaseStudy = (study: CaseStudy) => {
  caseStore.set(study.id, study);
};

export const registerCaseStudies = (studies: CaseStudy[]) => {
  studies.forEach(registerCaseStudy);
};

export const ensureAdditionalCasesRegistered = () => {
  if (!additionalRegistered) {
    registerCaseStudies(additionalCaseStudies);
    additionalRegistered = true;
  }
};

export const getCaseStudy = (id: string) => caseStore.get(id);

export const getCaseSummaries = (ids?: string[]): CaseSummary[] => {
  if (ids && ids.length > 0) {
    return ids
      .map((caseId) => caseStore.get(caseId))
      .filter((study): study is CaseStudy => Boolean(study))
      .map(({ id, title, shortDescription }) => ({ id, title, shortDescription }));
  }

  return Array.from(caseStore.values()).map(({ id, title, shortDescription }) => ({
    id,
    title,
    shortDescription,
  }));
};

export const getDefaultCaseSummaries = (): CaseSummary[] =>
  defaultCaseStudies.map(({ id, title, shortDescription }) => ({ id, title, shortDescription }));
