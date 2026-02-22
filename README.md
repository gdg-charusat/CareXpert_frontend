# CareXpert Frontend

**Team Number**: Team 119

## Description
CareXpert is a modern healthcare platform designed to connect patients with certified doctors. This frontend repository provides a user-friendly interface for managing appointments, health reports, and AI-powered consultations. This update introduces a structured README and resolves critical TypeScript and casing issues to improve onboarding and build stability.

## Related Issue
Closes #2

## Type of Change
- [x] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [x] Documentation update
- [x] Code refactoring
- [ ] Performance improvement
- [ ] Style/UI improvement

## Changes Made

### 🛠 Fixes & Improvements (Added by Developer)
- **Resolved TypeScript Errors (TS6133)**: Cleaned up unused variables and imports in over 10 files, including `NotificationsPage.tsx`, `PrescriptionsPage.tsx`, `ProfilePage.tsx`, and `UploadReportPage.tsx`.
- **Fixed Import Casing Discrepancies**: Standardized `Navbar` component imports to match the file system casing (`navbar.tsx`), resolving build failures on case-sensitive systems.
- **Removed Unused State**: Cleaned up redundant state management in `UploadReportPage.tsx` (e.g., unused `reportId`) to comply with strict type-checking.
- **Ensured Zero Warnings Build**: Validated the entire project with `npx tsc --noEmit` to ensure a completely clean build output.

### 📝 Documentation & Onboarding
- **Added detailed project overview section**
- **Added complete tech stack table** (Vite, React, TypeScript, Tailwind CSS, Lucide React, Framer Motion)
- **Added prerequisites and installation steps** (Supporting both `npm` and `pnpm`)
- **Added environment variable configuration guide**
- **Added running instructions and available scripts**
- **Added full folder structure explanation**
- **Improved markdown formatting and readability**
- **Added contribution workflow summary**

## Tech Stack
| Technology | Description |
| --- | --- |
| [Vite](https://vitejs.dev/) | Frontend Build Tool |
| [React](https://reactjs.org/) | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Lucide React](https://lucide.dev/) | Icon Set |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Axios](https://axios-http.com/) | API Requests |
| [Zustand](https://docs.pmnd.rs/zustand/) | State Management |

## Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

## Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
# OR
pnpm install
```

## Running the Project
```bash
npm run dev
# OR
pnpm dev
```

## Environment Variables
Create a `.env` file in the root directory:
```
VITE_BASE_URL=your_api_base_url
```

## Project Structure
```text
src/
├── components/     # Reusable UI components
├── pages/          # Page-level components
├── store/          # Zustand store for state management
├── styles/         # Global styles
└── main.tsx        # Application entry point
```

## Testing
- [x] Tested on Desktop (Chrome/Firefox/Safari)
- [x] Tested responsive design (different screen sizes)
- [x] No console errors or warnings
- [x] Code builds successfully (`npm run build`)

## Checklist
- [x] My code follows the project's code style guidelines
- [x] I have performed a self-review of my code
- [x] I have commented my code where necessary
- [x] My changes generate no new warnings
- [x] I have tested my changes thoroughly
- [x] All TypeScript types are properly defined
- [x] Tailwind CSS classes are used appropriately (no inline styles)
- [x] Component is responsive across different screen sizes
- [x] I have read and followed the CONTRIBUTING.md guidelines

## Additional Notes
This update significantly improves developer experience by providing clear documentation and ensuring structural integrity of the codebase. It resolves build-time errors that were previously blocking developers from seeing a clean build.
