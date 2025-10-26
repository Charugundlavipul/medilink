/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface ChatSummaryRequest {
  prompt: string;
}

export type CaseAttachmentType = "image" | "document" | "data" | "video";

export interface CaseAttachment {
  name: string;
  type: CaseAttachmentType;
  size: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  author: string;
  shortDescription: string;
  abstractSummary: string;
  initialPresentation: string;
  keyChallenge: string;
  collaborativeInsights: string;
  finalDiagnosis: string;
  patientOutcome: string;
  attachments: CaseAttachment[];
}

export interface CaseSummary {
  id: string;
  title: string;
  shortDescription: string;
}

export interface ChatSummaryResponse {
  summary: string;
  cases?: CaseStudy[];
}
