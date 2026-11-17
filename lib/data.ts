export const P = {
  email: "deveshg6386@gmail.com",
  phone: "+91-6386809751",
  resume: "/Devesh_Gupta_Resume.pdf",
  github: "https://github.com/devesh6386",
  linkedin: "https://www.linkedin.com/in/devesh-gupta-3ab93b325",
  leetcode: "https://leetcode.com/devesh6386",
};

export type BadgeTone = "emerald" | "cyan" | "violet";

export type FlowStep = {
  step: string;
  items: string[];
};

export type PipelineStage = {
  stage: string;
  nodes: string[];
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  badges: { label: string; tone: BadgeTone }[];
  summary?: string;
  points: string[];
  stack: string[];
  flow?: FlowStep[];
  pipeline: PipelineStage[];
  github: string;
  demo: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "agentprocure",
    featured: true,
    title: "AgentProcure AI",
    subtitle: "Autonomous Procurement Platform",
    badges: [
      { label: "Agentic Workflow", tone: "emerald" },
      { label: "LangSmith Traced", tone: "cyan" },
      { label: "Full-Stack Deployed", tone: "violet" },
    ],
    summary:
      "Stateful procurement agent built with Python FastAPI and Groq (LLaMA-3.3-70B) using tool calling and structured outputs to automate compliance checks.",
    points: [
      "Implemented BM25 RAG retrieval over corporate policy documents with contextual thread memory to validate purchase requests against multi-tier rules.",
      "Designed normalized SQLModel schemas and queries with PyJWT RBAC and PayPal REST API authorization to manage approval states and audit logs.",
      "Instrumented LangSmith thread tracing to evaluate multi-step agent latency, token usage, and output quality; deployed on Vercel and Render.",
    ],
    flow: [
      { step: "01", items: ["Next.js UI"] },
      { step: "02", items: ["FastAPI + PyJWT RBAC"] },
      { step: "03", items: ["LangGraph/Groq Agent"] },
      {
        step: "04",
        items: ["BM25 Policy RAG", "SQLModel/PostgreSQL", "PayPal API"],
      },
      { step: "05", items: ["LangSmith Traces"] },
    ],
    pipeline: [
      { stage: "STAGE 1", nodes: ["Next.js UI"] },
      { stage: "STAGE 2", nodes: ["FastAPI + PyJWT RBAC"] },
      { stage: "STAGE 3", nodes: ["LangGraph / Groq Agent"] },
      {
        stage: "STAGE 4",
        nodes: ["BM25 Policy RAG", "SQLModel / PostgreSQL", "PayPal API"],
      },
      { stage: "STAGE 5", nodes: ["LangSmith Traces"] },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "SQLModel",
      "Groq",
      "LangSmith",
      "PyJWT",
      "PostgreSQL",
    ],
    github: P.github,
    demo: "#",
  },
  {
    id: "nyaysathi",
    title: "NyaySathi",
    subtitle: "AI Legal Assistant",
    badges: [{ label: "+40% Semantic Relevance", tone: "emerald" }],
    points: [
      "Engineered a RAG and semantic search backend over Indian legal documents, improving retrieval relevance by 40% over keyword baselines.",
      "Tuned recursive chunking, vector embeddings in ChromaDB, and metadata filtering to ground LLM responses in verifiable statutory citations.",
      "Deployed asynchronous FastAPI endpoints with structured JSON schemas for low-latency inference under concurrent user traffic.",
    ],
    pipeline: [
      { stage: "STAGE 1", nodes: ["Legal Corpus"] },
      { stage: "STAGE 2", nodes: ["Recursive Chunker"] },
      { stage: "STAGE 3", nodes: ["ChromaDB Vector Index"] },
      { stage: "STAGE 4", nodes: ["LLaMA Grounded Citations"] },
    ],
    stack: [
      "Python",
      "FastAPI",
      "LangChain",
      "ChromaDB",
      "RAG",
      "Semantic Search",
      "LLaMA",
    ],
    github: P.github,
    demo: "#",
  },
  {
    id: "carerisk",
    title: "CareRisk AI",
    subtitle: "Healthcare Risk Prediction Platform",
    badges: [{ label: "92% Classification Accuracy", tone: "emerald" }],
    points: [
      "Developed an end-to-end risk scoring engine using XGBoost and stacking ensembles with automated feature preprocessing and model evaluation.",
      "Integrated a context-aware conversational AI assistant (Groq) and interactive dashboard to deliver plain-language risk explanations and PDF reports.",
    ],
    pipeline: [
      { stage: "STAGE 1", nodes: ["Patient Data"] },
      { stage: "STAGE 2", nodes: ["Feature Preprocessing"] },
      { stage: "STAGE 3", nodes: ["XGBoost + Stacking Ensemble"] },
      { stage: "STAGE 4", nodes: ["Groq Assistant", "PDF Reports"] },
    ],
    stack: ["Python", "Streamlit", "Scikit-learn", "XGBoost", "Groq"],
    github: P.github,
    demo: "#",
  },
  {
    id: "metrology",
    title: "Legal Metrology Compliance Checker",
    subtitle: "Smart India Hackathon 2026",
    badges: [{ label: "SIH 2026 College Qualifier", tone: "emerald" }],
    points: [
      "Designed a two-stage object detection and OCR extraction pipeline to automate packaged-product declaration audits under Legal Metrology Rules.",
      "Conducted systematic error analysis on bounding-box localization and text parsing metrics to reduce false positives across label layouts.",
    ],
    pipeline: [
      { stage: "STAGE 1", nodes: ["Product Image"] },
      { stage: "STAGE 2", nodes: ["Object Detection"] },
      { stage: "STAGE 3", nodes: ["OCR Extraction"] },
      { stage: "STAGE 4", nodes: ["Rule Validation"] },
    ],
    stack: ["Python", "Object Detection", "OCR", "Computer Vision"],
    github: P.github,
    demo: "#",
  },
];

export type SkillCategory = {
  title: string;
  filterGroup: "AI & Agents" | "Backend & SQL" | "Languages & Cloud";
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "AI, Agents & Search",
    filterGroup: "AI & Agents",
    items: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "Groq",
      "RAG (BM25 & Dense)",
      "Hybrid & Semantic Search",
      "ChromaDB",
      "Vector Embeddings",
      "Tool Calling",
      "Structured Outputs (Pydantic)",
      "LLM Evals",
      "Prompt Engineering",
      "NLP",
      "Computer Vision",
      "OCR",
      "Scikit-learn",
      "XGBoost",
      "LLaMA",
    ],
  },
  {
    title: "Backend & Databases",
    filterGroup: "Backend & SQL",
    items: [
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Supabase",
      "SQLModel",
      "Relational Schema Design",
      "Query Optimization",
      "PyJWT (RBAC)",
      "Node.js",
    ],
  },
  {
    title: "Languages",
    filterGroup: "Languages & Cloud",
    items: [
      "Python",
      "C++",
      "SQL",
      "JavaScript",
      "TypeScript",
      "Java",
      "HTML5/CSS3",
    ],
  },
  {
    title: "Frontend, Cloud & DevOps",
    filterGroup: "Languages & Cloud",
    items: [
      "Next.js",
      "React.js",
      "Docker",
      "Git",
      "GitHub",
      "Linux",
      "Vercel",
      "Render",
      "VS Code",
      "Jupyter",
    ],
  },
];

export const jobs = [
  {
    role: "Web Developer Intern",
    org: "InAmigos Foundation",
    when: "May 2026 – Jun 2026",
    text: "Built scalable React.js & Node.js applications, designed relational SQL schemas/indexed queries, and reduced REST API latency.",
  },
  {
    role: "Technical & PR Team Member",
    org: "Robotics Club, NIT Patna",
    when: "Jan 2025 – Present",
    text: "Built interactive dashboards and backend workflows integrating real-time hardware sensor streams across 5+ robotics projects.",
  },
];

export const edu = [
  {
    topMeta: "Expected Aug 2028 | GPA: 8.0/10.0",
    institution: "National Institute of Technology Patna",
    degree: "B.Tech in Electrical Engineering",
  },
  {
    topMeta: "Secondary CBSE: 94.9% (2021)",
    institution: "Jingle Bell Academy, Ayodhya",
    degree: "Senior Secondary CBSE: 92.2% (2023)",
  },
];

export type Achievement = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  icon: "trophy" | "brain" | "cloud" | "award";
  tone: "emerald" | "violet" | "cyan";
  href?: string;
};

export const wins: Achievement[] = [
  {
    id: "dsa",
    tag: "COMPETITIVE PROGRAMMING",
    title: "900+ DSA Problems Solved",
    subtitle: "LeetCode · Peak Rating: 1858",
    icon: "trophy",
    tone: "emerald",
    href: P.leetcode,
  },
  {
    id: "agents",
    tag: "AI AGENTS SPECIALIZATION",
    title: "Google 5-Day AI Agents Intensive Course",
    subtitle: "Agent architectures, tool use, memory, evaluation",
    icon: "brain",
    tone: "violet",
  },
  {
    id: "oci",
    tag: "CLOUD & AI CERTIFICATION",
    title: "Oracle Cloud Infrastructure (OCI) Certified AI Foundation Associate",
    subtitle: "OCI Generative AI & ML foundations",
    icon: "cloud",
    tone: "cyan",
  },
  {
    id: "sih",
    tag: "HACKATHON",
    title: "Smart India Hackathon (SIH) 2026",
    subtitle: "Cleared college-level qualification round",
    icon: "award",
    tone: "emerald",
  },
];

export const starters = [
  "Why is Devesh a strong fit for an AI Agent internship?",
  "Walk me through AgentProcure AI's architecture.",
  "What is his experience with SQL, FastAPI, and RAG?",
  "Tell me about his competitive programming & academics.",
];

export function answer(q: string): string {
  const s = q.toLowerCase();
  if (/agentprocure|architecture|procure/.test(s))
    return "AgentProcure AI flows Next.js UI → FastAPI with PyJWT RBAC → a LangGraph/Groq (LLaMA-3.3-70B) agent. The agent reads a BM25 policy RAG index, SQLModel/PostgreSQL for approval states and audit logs, and the PayPal REST API for authorization. Every step is traced in LangSmith. It is deployed on Vercel and Render.";
  if (/sql|fastapi|rag|backend/.test(s))
    return "He ships FastAPI + PostgreSQL systems: normalized SQLModel schemas, PyJWT RBAC, and async endpoints with structured JSON. On RAG, NyaySathi improved retrieval relevance by 40% over keyword baselines using recursive chunking, ChromaDB and metadata filters. AgentProcure uses BM25 retrieval with thread memory. At InAmigos he designed indexed SQL schemas and cut REST API latency.";
  if (/leetcode|competitive|academic|gpa|cgpa|college|nit/.test(s))
    return "900+ LeetCode problems solved, peak rating 1858. He is a B.Tech Electrical Engineering student at NIT Patna (expected Aug 2028, GPA 8.0/10), with 92.2% in CBSE Senior Secondary (2023) and 94.9% in Secondary (2021). He also cleared the Smart India Hackathon 2026 college round.";
  if (/fit|why|intern|hire|agent/.test(s))
    return "He builds the full agent loop: tool-calling LLM workflows on Groq, hybrid retrieval, structured Pydantic outputs, and LangSmith tracing for latency, token use and quality. Evidence: AgentProcure AI (deployed), NyaySathi (+40% relevance), CareRisk AI (92% accuracy), the Google 5-Day AI Agents Intensive, and the OCI AI Foundation certification.";
  return "I can only answer from Devesh's resume and projects. Try asking about AgentProcure AI, his SQL/FastAPI/RAG experience, or his competitive programming and academics.";
}