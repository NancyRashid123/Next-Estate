# Next-Estate

A full-featured real estate platform for browsing property listings and managing property ownership. The application supports English and Arabic interfaces and provides authenticated property-management workflows.

## Live Demo

[Open Next-Estate](https://next-estate-plum.vercel.app/)

## Features

- Browse real-estate listings and view individual property details.
- Search and explore properties through dedicated listing pages.
- User authentication with email-based sign-in and Google OAuth.
- Protected user workflows for managing owned properties.
- Create and manage property listings associated with the authenticated owner.
- Upload and manage property images using Cloudinary.
- Send property inquiries using email delivery integration.
- Localized interface with English and Arabic support using `next-intl`.
- Responsive interface for desktop and mobile screens.

## Tech Stack

- **Framework:** Next.js App Router, React, TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon), Prisma ORM
- **Authentication:** Better Auth, Google OAuth
- **State Management:** Zustand
- **Internationalization:** next-intl
- **Media Storage:** Cloudinary
- **Email:** Resend, React Email
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js
- pnpm or npm
- A PostgreSQL database (the project uses Neon)
- Credentials for the configured authentication, Cloudinary, and email services

### Installation

```bash
git clone https://github.com/NancyRashid123/Next-Estate.git
cd Next-Estate
npm install
```

### Environment Variables

Create a `.env` file in the project root and configure the variables required by your local setup. Typical integrations used by this project include:

- Database connection for Neon/PostgreSQL
- Better Auth secret and base URL
- Google OAuth client credentials
- Cloudinary credentials
- Resend API key and sender configuration

Use the exact variable names expected by the project configuration. Never commit real credentials.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

## Database

The project uses Prisma ORM with PostgreSQL. The Prisma schema includes users, sessions, accounts, verification records, and properties linked to their owners.

## Deployment

The application is deployed on Vercel: [next-estate-plum.vercel.app](https://next-estate-plum.vercel.app/).

## Author

**Nancy Rashid**  
[GitHub Profile](https://github.com/NancyRashid123)
