import roboticCard from "@/assets/course-robotic.svg";
import mriCard from "@/assets/course-mri.svg";
import pharmCard from "@/assets/course-pharm.svg";
import vaxCard from "@/assets/course-vax.svg";
import sterileCard from "@/assets/course-sterile.svg";
import orCard from "@/assets/course-or.svg";

export type Course = {
  id: string;
  title: string;
  instructor: string;
  org: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  certification: boolean;
  cardImage: string;
  heroImage: string;
  summary: string;
};

export const courses: Course[] = [
  {
    id: "robotic-assisted-laparoscopic-surgery",
    title: "Robotic-Assisted Laparoscopic Surgery",
    instructor: "Kenji Tanaka",
    org: "Johns Hopkins",
    duration: "8 Hours",
    difficulty: "Expert",
    certification: true,
    cardImage: roboticCard,
    heroImage: roboticCard,
    summary:
      "Master robotic instrumentation workflows, surgical ergonomics, and intraoperative troubleshooting for complex laparoscopic cases.",
  },
  {
    id: "advanced-mri-interpretation",
    title: "Advanced MRI Interpretation",
    instructor: "Emily Carter",
    org: "Mayo Clinic",
    duration: "6 Hours",
    difficulty: "Advanced",
    certification: false,
    cardImage: mriCard,
    heroImage: mriCard,
    summary:
      "Deepen your diagnostic accuracy with advanced neuro, musculoskeletal, and cardiac MRI pattern recognition techniques.",
  },
  {
    id: "new-frontiers-pharm",
    title: "New Frontiers in Pharmacology",
    instructor: "Samuel Adebayo",
    org: "Stanford Medicine",
    duration: "4 Hours",
    difficulty: "Intermediate",
    certification: false,
    cardImage: pharmCard,
    heroImage: pharmCard,
    summary:
      "Explore precision therapeutics, pharmacogenomics, and novel delivery systems reshaping modern clinical practice.",
  },
  {
    id: "pediatric-vax",
    title: "Pediatric Vaccination Protocols",
    instructor: "Laura Chen",
    org: "Children's Hospital",
    duration: "3 Hours",
    difficulty: "Beginner",
    certification: true,
    cardImage: vaxCard,
    heroImage: vaxCard,
    summary:
      "Stay current on pediatric immunization schedules, contraindications, and family communication strategies.",
  },
  {
    id: "sterile-tech",
    title: "Sterile Techniques Refresher",
    instructor: "Marco Rossi",
    org: "Cleveland Clinic",
    duration: "2 Hours",
    difficulty: "Beginner",
    certification: false,
    cardImage: sterileCard,
    heroImage: sterileCard,
    summary:
      "Refresh core aseptic techniques, instrument handling, and OR field management to minimize infection risk.",
  },
  {
    id: "or-safety",
    title: "Operating Room Safety",
    instructor: "Aisha Khan",
    org: "Mass General",
    duration: "5 Hours",
    difficulty: "Intermediate",
    certification: true,
    cardImage: orCard,
    heroImage: orCard,
    summary:
      "Implement evidence-based safety checklists, crisis resource management, and team communication frameworks in the OR.",
  },
];

export const courseMap = courses.reduce<Record<string, Course>>((acc, course) => {
  acc[course.id] = course;
  return acc;
}, {});

export const getCourseById = (id: string | undefined) => {
  if (!id) return undefined;
  return courseMap[id];
};
