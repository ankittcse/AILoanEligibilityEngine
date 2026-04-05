

# AI Home Loan Eligibility Checker 2.0

## Overview
A production-grade AI-powered home loan intelligence platform with three user roles (Applicant, Advisor, Admin), featuring eligibility prediction, document analysis, explainable AI, and professional dashboards — built as a startup-quality SaaS product.

## Architecture
- **Frontend**: React + Tailwind + shadcn/ui (beautiful FinTech UI)
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **AI**: Lovable AI (LLM-powered analysis, explanations, document intelligence) + rule-based scoring engine
- **Auth**: Supabase Auth with role-based access (applicant, advisor, admin)

---

## Phase 1: Foundation & Landing Page

### Landing Page
- Hero section with gradient background, headline "Know Your Home Loan Eligibility in Minutes", CTA buttons
- Feature cards (6 key features with icons): AI Scoring, Document Verification, EMI Calculator, Risk Analysis, Personalized Recommendations, Downloadable Reports
- How It Works section (3 steps: Fill Profile → Upload Docs → Get Results)
- Trust/stats section (e.g., "10,000+ applications analyzed")
- Footer with links

### Auth System
- Sign up / Login pages with Supabase Auth
- Role-based routing: applicants → user dashboard, advisors → advisor panel, admins → admin dashboard
- Roles table in Supabase (user_roles)

### Color Theme & Design
- Primary: Deep blue (#1a365d), Accent: Emerald green (#059669), Warning: Amber, Danger: Red
- Clean card-based layouts, Inter/Plus Jakarta Sans fonts
- Score meters, progress rings, status badges, smooth animations

---

## Phase 2: Applicant Journey

### Profile & Financial Details Form
- Multi-step wizard form:
  1. Personal Info (name, age, gender, dependents, marital status)
  2. Employment (type, employer, years, designation)
  3. Financial (monthly income, expenses, existing EMIs, savings, credit score range)
  4. Loan Requirements (amount, tenure, property type, property value, location)
  5. Co-applicant (optional: income, employment)
- Form validation with Zod, progress indicator

### Document Upload Module
- Upload interface for: Salary slips, Bank statements, ID proof, Employment proof
- Drag & drop + file picker, upload to Supabase Storage
- Status badges per document (Uploaded / Verified / Issues Found / Missing)
- Lovable AI Edge Function to analyze uploaded documents via OCR-style text extraction and compare with form data

### Eligibility Engine (Hybrid)
- **Rule-based scoring** (computed in Edge Function):
  - Age score, Income-to-EMI ratio, Debt-to-income ratio, Employment stability, Credit score weight, Savings adequacy, Property LTV ratio
  - Weighted composite score (0-100)
- **AI-powered analysis** (Lovable AI Edge Function):
  - Generates human-readable eligibility explanation
  - Provides personalized improvement suggestions
  - Detects risk factors and explains them
  - Estimates max loan amount and EMI affordability

### User Dashboard
- **Overview cards**: Eligibility Score (gauge chart), Loan Amount Estimate, Monthly EMI, Risk Level badge
- **Eligibility Breakdown**: Factor-by-factor bar chart showing contribution of each parameter
- **Improvement Suggestions**: AI-generated actionable tips (e.g., "Reduce existing EMIs by ₹5,000 to improve score by 8 points")
- **Document Status**: Grid showing each document's verification state
- **Loan Readiness Meter**: Visual progress ring showing overall readiness percentage
- **EMI Calculator**: Interactive calculator with sliders for amount, rate, tenure
- **Download Report**: PDF-style eligibility summary

### AI Financial Assistant (Chat)
- Chatbot interface using Lovable AI
- Users can ask: "Why was I rejected?", "How can I improve my score?", "What documents am I missing?", "Can I afford a ₹50L loan?"
- Context-aware: uses applicant's profile data in prompts

---

## Phase 3: Admin & Advisor Dashboards

### Admin Dashboard
- **Overview**: Total applications, approval rate, average score, risk distribution
- **Applications Table**: Sortable/filterable list of all applicants with score, status, risk level
- **Risk Heatmap**: Visual grid showing applicant risk distribution
- **Analytics Charts**: Score distribution histogram, approval trends over time, common rejection reasons
- **Decision Logs**: Audit trail of all decisions

### Advisor Panel
- **Assigned Applications**: List of applicants to review
- **Applicant Detail View**: Full profile, documents, AI analysis, score breakdown
- **Document Verification Panel**: Side-by-side view of uploaded docs and extracted data, mismatch highlights
- **Decision Actions**: Approve / Conditionally Approve / Reject with notes
- **AI Decision Support**: Lovable AI generates advisor recommendation summary
- **Advisor Notes**: Add notes to applications

---

## Phase 4: Intelligence & Reports

### Document AI Analysis (Edge Function)
- Extract key fields from uploaded documents using Lovable AI
- Compare extracted values (income, name, dates) with form entries
- Flag mismatches and confidence levels
- Generate document verification summary

### Fraud/Mismatch Detection
- Income mismatch between form and documents
- Name/date inconsistencies
- Missing critical documents flagged
- Anomaly flags shown to advisors

### Report Generation
- **Loan Readiness Report**: Comprehensive PDF with score, breakdown, suggestions, document status
- **Risk Summary**: For advisors/admins
- Generated as structured HTML rendered to downloadable format

---

## Database Schema (Key Tables)

- **profiles**: user_id, full_name, age, gender, marital_status, dependents, phone, address
- **user_roles**: user_id, role (applicant/advisor/admin)
- **financial_profiles**: user_id, monthly_income, expenses, existing_emis, savings, credit_score_range, employment_type, employer, years_employed
- **loan_applications**: id, user_id, amount_requested, tenure, property_type, property_value, location, status, created_at
- **documents**: id, application_id, doc_type, file_path, verification_status, ai_analysis_json, confidence_score
- **eligibility_results**: id, application_id, overall_score, max_loan_amount, estimated_emi, risk_level, factor_breakdown_json, ai_explanation, suggestions_json
- **advisor_actions**: id, application_id, advisor_id, action, notes, created_at
- **audit_logs**: id, user_id, action, details, created_at

---

## Pages to Build
1. Landing Page
2. Login / Sign Up
3. Applicant Dashboard
4. Profile & Financial Form (multi-step)
5. Document Upload
6. Eligibility Results
7. EMI Calculator
8. AI Chat Assistant
9. Admin Dashboard
10. Admin Analytics
11. Advisor Panel
12. Applicant Detail View (for advisors)
13. Settings / Profile page

---

## Key Edge Functions
1. **calculate-eligibility**: Rule-based scoring engine
2. **ai-analyze**: Lovable AI for explanations, suggestions, risk analysis
3. **analyze-document**: Document text extraction and mismatch detection via AI
4. **chat-assistant**: AI financial assistant chatbot
5. **generate-report**: Structured eligibility report generation

