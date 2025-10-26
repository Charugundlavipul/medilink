import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, CheckCircle2, XCircle, Trash2, ArrowLeft, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import * as UI from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface UploadItem {
  id: string;
  name: string;
  sizeMB: number;
  status: "ok" | "error";
}

export default function Create() {
  const navigate = useNavigate();
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);

  const [title, setTitle] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [description, setDescription] = useState("");

  const [uploads, setUploads] = useState<UploadItem[]>([{
    id: "1",
    name: "ecg_scan_01.jpg",
    sizeMB: 2.3,
    status: "ok",
  },{
    id: "2",
    name: "mri_brain.dcm",
    sizeMB: 15.8,
    status: "error",
  }]);

  const onDrop = useCallback((files: FileList | null) => {
    if (!files) return;
    const next: UploadItem[] = Array.from(files).map((f, i) => ({
      id: crypto.randomUUID(),
      name: f.name,
      sizeMB: Math.max(0.1, +(f.size / (1024 * 1024)).toFixed(1)),
      status: "ok",
    }));
    setUploads((u) => [...u, ...next]);
  }, []);

  const removeUpload = (id: string) => setUploads((u) => u.filter((x) => x.id !== id));

  const canPost = useMemo(() => consent1 && consent2 && title.trim().length > 3, [consent1, consent2, title]);

  return (
    <div className="space-y-8 pb-28">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="space-y-4">
            <Button
              variant="ghost"
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-muted-foreground hover:text-primary"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                Post a New Case
              </h1>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Share complex cases with the MediLink community—upload key imaging, highlight decisions, and invite
                peer collaboration.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 text-primary shadow-sm">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em]">
              <ShieldCheck className="h-5 w-5" />
              Confidentiality
            </div>
            <p className="mt-3 text-xs leading-relaxed">
              Ensure all identifying details are removed. MediLink encrypts uploads and limits access to verified
              clinicians.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm md:p-7">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Compliance & Patient Consent
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirm that your submission aligns with MediLink’s privacy and ethical sharing standards.
        </p>
        <div className="mt-5 space-y-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent1}
              onChange={(e) => setConsent1(e.target.checked)}
              className="mt-1 h-4 w-4 rounded-sm border border-input bg-background"
            />
            <span className="text-sm text-foreground">
              I confirm that all patient-identifying information has been removed from the case data and any uploaded
              files.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent2}
              onChange={(e) => setConsent2(e.target.checked)}
              className="mt-1 h-4 w-4 rounded-sm border border-input bg-background"
            />
            <span className="text-sm text-foreground">
              I have obtained all necessary patient consent for sharing this case for educational and research purposes.
            </span>
          </label>
          <a href="#" className="inline-flex items-center text-xs font-medium text-primary underline">
            View detailed compliance policies
          </a>
        </div>
      </section>

      <section className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm md:p-7">
        <h2 className="text-lg font-semibold text-foreground">Case Details</h2>
        <p className="mt-1 text-sm text-muted-foreground">Outline patient demographics, specialty, and the core narrative.</p>
        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Case Title</Label>
            <Input
              id="title"
              placeholder="e.g., Atypical Presentation of Acute Myocardial Infarction"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Patient Age</Label>
              <Input id="age" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Medical Specialty</Label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select Specialty</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="radiology">Radiology</option>
              <option value="em">Emergency Medicine</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Case Description & History</Label>
            <Textarea
              rows={6}
              placeholder="Provide a detailed description of the case, including patient history, symptoms, examination findings, and investigation results."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm md:p-7">
        <h2 className="text-lg font-semibold text-foreground">Upload Files & Images</h2>
        <p className="mt-1 text-sm text-muted-foreground">Attach imaging, lab reports, or documents that support the case.</p>
        <div
          className="mt-5 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onDrop(e.dataTransfer.files);
          }}
        >
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <UploadCloud className="h-7 w-7" />
          </div>
          <p className="mt-3 text-sm font-medium text-foreground">Drag and drop files here</p>
          <p className="text-xs text-muted-foreground">DICOM, PDF, JPEG, PNG up to 50MB each</p>
          <div className="mt-4">
            <label className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10">
              <input type="file" multiple hidden onChange={(e) => onDrop(e.target.files)} />
              Browse Files
            </label>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {uploads.map((f) => (
            <div key={f.id} className="flex items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                {f.status === "ok" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <div className="truncate">
                  <span className="truncate align-middle">{f.name}</span>
                  <span className="ml-1 text-muted-foreground">({f.sizeMB} MB)</span>
                </div>
              </div>
              <button
                onClick={() => removeUpload(f.id)}
                className={cn("rounded-full p-2 hover:bg-muted", f.status === "error" && "text-red-600")}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm md:p-7">
        <h2 className="text-lg font-semibold text-foreground">Review & Post</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirm the case details. Once published, accredited MediLink physicians can collaborate instantly.
        </p>
        <div className="mt-5 flex items-center justify-end gap-3">
          <UI.Button variant="outline" type="button">
            Save as Draft
          </UI.Button>
          <UI.Button disabled={!canPost}>Post Case</UI.Button>
        </div>
      </section>
    </div>
  );
}
