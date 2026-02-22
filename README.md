# CareXpert Frontend

<<<<<<< HEAD
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
=======
**CareXpert** is a full-featured healthcare platform that connects patients with doctors through appointment booking, real-time chat, video consultations, prescription management, and more. This repository contains the frontend client built with React and TypeScript.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

| Category            | Technology                                                  |
| ------------------- | ----------------------------------------------------------- |
| **Framework**       | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool**      | [Vite 5](https://vitejs.dev/)                               |
| **Styling**         | [Tailwind CSS 3](https://tailwindcss.com/)                   |
| **UI Components**   | [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)   |
| **Routing**         | [React Router v6](https://reactrouter.com/)                  |
| **State Management**| [Zustand](https://zustand-demo.pmnd.rs/)                    |
| **Forms**           | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **HTTP Client**     | [Axios](https://axios-http.com/)                             |
| **Real-time**       | [Socket.IO Client](https://socket.io/)                      |
| **Video Calls**     | [VideoSDK](https://www.videosdk.live/)                       |
| **Charts**          | [Recharts](https://recharts.org/)                            |
| **Animations**      | [Framer Motion](https://www.framer.com/motion/)              |
| **Icons**           | [Lucide React](https://lucide.dev/)                          |
| **Package Manager** | [pnpm](https://pnpm.io/)                                    |

---

## Features

- **Patient & Doctor Dashboards** — Role-based views with relevant stats and actions
- **Appointment Booking** — Search doctors, view profiles, and book appointments
- **Real-time Chat** — Instant messaging between patients and doctors via Socket.IO
- **Video Consultations** — In-browser video calls powered by VideoSDK
- **Prescription Management** — View and manage prescriptions
- **Notifications** — Real-time notification system
- **Report Uploads** — Patients can upload medical reports
- **Pharmacy** — Browse pharmacy information
- **Admin Panel** — Administrative controls for platform management
- **Dark / Light Theme** — Toggle between themes with persistent preference
- **Responsive Design** — Mobile-friendly layout across all pages

---

## Prerequisites

Make sure the following are installed on your machine:

- **Node.js** — v18 or later → [Download](https://nodejs.org/)
- **Package manager** — `pnpm` (recommended) or `npm`

### Recommendation

Use **pnpm** as the default for contributors (this project is primarily maintained with `pnpm-lock.yaml`).

`npm` is also supported, but avoid mixing package managers in the same branch/PR to prevent lockfile churn.

Install pnpm globally (if you choose pnpm):

  ```bash
  npm install -g pnpm
  ```

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-org>/CareXpert_frontend.git
   cd CareXpert_frontend
   ```

2. **Install dependencies**

   **Option A — Recommended (`pnpm`)**

   ```bash
   pnpm install
   ```

   **Option B — Alternative (`npm`)**

   ```bash
   npm install
   ```

---

## Environment Variables

The app requires a few environment variables to connect to the backend API and socket server.

Create a `.env` file in the project root manually (next to `package.json`).

Then fill in the following values:

| Variable          | Description                                  | Example                        |
| ----------------- | -------------------------------------------- | ------------------------------ |
| `VITE_BASE_URL`   | Base URL of the backend API server           | `http://localhost:5000`        |
| `VITE_SOCKET_URL` | URL of the Socket.IO server                  | `http://localhost:5000`        |

**.env**

```env
VITE_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

> **Important:** Never commit your `.env` file. It is (and should be) listed in `.gitignore`. If you need actual credentials for development, contact the project maintainers privately.

---

## Running the Project

**Start the development server:**

```bash
pnpm dev
```

or

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (default Vite port).

**Build for production:**

```bash
pnpm build
```

or

```bash
npm run build
```

**Preview production build locally:**

```bash
pnpm preview
```

or

```bash
npm run preview
```

---

## Available Scripts

| Purpose         | pnpm command     | npm command        |
| --------------- | ---------------- | ------------------ |
| Start dev server | `pnpm dev`      | `npm run dev`      |
| Production build | `pnpm build`    | `npm run build`    |
| Preview build    | `pnpm preview`  | `npm run preview`  |
| Lint code        | `pnpm lint`     | `npm run lint`     |

---

## Folder Structure

```
CareXpert_frontend/
├── public/                  # Static assets served as-is
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/              # shadcn/ui primitives (Button, Card, Dialog, etc.)
│   │   ├── navbar.tsx       # Top navigation bar
│   │   ├── sidebar.tsx      # Dashboard sidebar navigation
│   │   ├── footer.tsx       # Site footer
│   │   ├── layout.tsx       # Public page layout (navbar + footer)
│   │   ├── DashboardLayout.tsx  # Authenticated layout (sidebar + content)
│   │   ├── ai-chat-box.tsx  # AI-powered chat box component
│   │   ├── VideoCall.tsx    # Video call component (VideoSDK)
│   │   ├── theme-provider.tsx   # Theme context provider
│   │   └── theme-toggle.tsx     # Dark/light mode toggle
│   ├── context/             # React context providers
│   │   ├── auth-context.tsx # Authentication context & provider
│   │   └── theme-context.tsx# Theme context & provider
│   ├── lib/                 # Utility functions
│   │   └── utils.ts         # Helper utilities (cn, etc.)
│   ├── pages/               # Page-level components (one per route)
│   │   ├── auth/            # Authentication pages (Login, Signup)
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── PatientDashboard.tsx   # Patient dashboard
│   │   ├── DoctorDashboard.tsx    # Doctor dashboard
│   │   ├── ChatPage.tsx     # Real-time messaging
│   │   ├── DoctorsPage.tsx  # Doctor listing & search
│   │   ├── BookAppointmentPage.tsx # Appointment booking
│   │   ├── AdminPage.tsx    # Admin panel
│   │   └── ...              # Other pages
│   ├── sockets/             # Socket.IO client setup & event handlers
│   │   └── socket.ts        # Socket connection & messaging functions
│   ├── store/               # Zustand state stores
│   │   └── authstore.ts     # Authentication store
│   ├── App.tsx              # Root component (providers + router)
│   ├── routes.tsx           # All route definitions
│   ├── main.tsx             # Application entry point
│   ├── globals.css          # Global styles & Tailwind directives
│   └── vite-env.d.ts        # Vite/TypeScript env type declarations
├── styles/
│   └── globals.css          # Additional global styles
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.mjs       # PostCSS configuration
├── package.json             # Dependencies & scripts
└── pnpm-lock.yaml           # Lockfile for reproducible installs
```

---

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

**Quick summary:**

1. Check for existing issues or create a new one
2. Wait for a maintainer to assign the issue to you
3. Fork the repo and create a feature branch from `main`
4. Make your changes and test locally
5. Submit a pull request with a clear description and your team number

For detailed rules and guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

This project is part of the **GDG CHARUSAT Open Source Contri Sprintathon**. Please refer to the repository for licensing details.
>>>>>>> 149c3163a76b340e5211d055cc461bef3316e76f
