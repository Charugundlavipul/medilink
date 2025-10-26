export type CaseAttachment = {
  name: string;
  type: "image" | "document" | "video";
  size: string;
};

export type CaseComment = {
  id: string;
  author: string;
  specialty: string;
  initials: string;
  timestamp: string;
  text: string;
  isReply?: boolean;
};

export type CaseDetail = {
  id: string;
  doctor: string;
  specialty: string;
  initials: string;
  postedDate: string;
  title: string;
  summary: string;
  keyChallenge: string;
  demographics: string;
  symptoms: string[];
  conditions: string;
  treatments: string[];
  attachments: CaseAttachment[];
  stats: {
    likes: number;
    insights: number;
    support: number;
  };
  comments: CaseComment[];
};

const baseComments: CaseComment[] = [
  {
    id: "c1",
    author: "Dr. Evelyn Reed",
    specialty: "Neurology",
    initials: "ER",
    timestamp: "1 day ago",
    text: "Given the lack of response to standard therapy, have you considered autoimmune etiologies? CSF antibody panels or PET imaging could be helpful depending on resources.",
  },
  {
    id: "c2",
    author: "Dr. Ben Adams",
    specialty: "Radiology",
    initials: "BA",
    timestamp: "22 hours ago",
    text: "Appreciate the insight, Dr. Reed. We're coordinating a lumbar puncture and advanced imaging follow-up.",
    isReply: true,
  },
];

export const cases: CaseDetail[] = [
  {
    id: "atypical-presentation-of-myocarditis-in-a-young-adult",
    doctor: "Dr. Emily Carter",
    specialty: "Cardiology",
    initials: "EC",
    postedDate: "12 hours ago",
    title: "Atypical Presentation of Myocarditis in a Young Adult",
    summary:
      "A 24-year-old endurance runner presented with diffuse chest tightness and exertional dyspnea following a viral prodrome. Initial biomarkers were equivocal and transthoracic echo was unrevealing. With persistent symptoms and sinus tachycardia, the cardiology team debated myocarditis versus early coronary vasospasm as the working diagnosis.",
    keyChallenge:
      "Patient reported vague chest discomfort and exertional dyspnea with minimal biomarker elevation. Standard workup was inconclusive.",
    demographics: "24, Male",
    symptoms: ["Exertional dyspnea", "Chest tightness", "Fatigue"],
    conditions: "No known comorbidities • Non-smoker",
    treatments: ["Beta-blocker trial", "NSAIDs", "Cardiac MRI (pending)"],
    attachments: [
      { name: "initial_ecg.jpg", type: "image", size: "1.8 MB" },
      { name: "echo_report.pdf", type: "document", size: "1.2 MB" },
      { name: "cardiac_mri_request.pdf", type: "document", size: "420 KB" },
    ],
    stats: {
      likes: 12,
      insights: 5,
      support: 4,
    },
    comments: baseComments,
  },
  {
    id: "rare-neurological-disorder-mimicking-a-stroke",
    doctor: "Dr. Johnathan Lee",
    specialty: "Neurology",
    initials: "JL",
    postedDate: "1 day ago",
    title: "Rare Neurological Disorder Mimicking a Stroke",
    summary:
      "A 55-year-old patient arrived with abrupt hemiparesis and progressive cognitive slowing. CT angiography was negative and thrombolytics were withheld. Metabolic panel revealed lactic acidosis, raising suspicion for a mitochondrial disorder that can mimic cerebrovascular events on presentation.",
    keyChallenge:
      "55-year-old presented with acute hemiparesis. Initial CT angiography negative, but symptoms progressed. Seeking guidance on rare mitochondrial disorders.",
    demographics: "55, Female",
    symptoms: ["Acute hemiparesis", "Cognitive slowing", "Lactic acidosis"],
    conditions: "History of migraines • Family history of neuromuscular disease",
    treatments: ["IV tPA (not administered)", "Supportive therapy", "Genetic panel (pending)"],
    attachments: [
      { name: "ct_head.png", type: "image", size: "2.9 MB" },
      { name: "mri_sequences.dcm", type: "image", size: "12.5 MB" },
      { name: "metabolic_workup.pdf", type: "document", size: "530 KB" },
    ],
    stats: {
      likes: 28,
      insights: 11,
      support: 7,
    },
    comments: [
      ...baseComments,
      {
        id: "c3",
        author: "Dr. Priya Menon",
        specialty: "Genetics",
        initials: "PM",
        timestamp: "10 hours ago",
        text: "Consider POLG mutation screening and mitochondrial DNA sequencing. Muscle biopsy may still be required, but imaging can guide the site.",
      },
    ],
  },
];

export const caseMap = cases.reduce<Record<string, CaseDetail>>((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
