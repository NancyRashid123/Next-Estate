
# 🏡 Next-Estate

A bilingual real estate platform built with **Next.js**, allowing users to browse property listings, view property details, authenticate securely, and manage their own listings.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://next-estate-plum.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

## ✨ Features

### Property Discovery

- Browse property listings.
- Open dedicated pages with detailed property information.
- Explore properties through listing and marketplace pages.

### Authentication & Authorization

- Email-based authentication.
- Google sign-in using OAuth.
- Session-based authentication powered by Better Auth.
- Protected property-management functionality for authenticated users.

### Property Management

- Create property listings associated with their authenticated owner.
- Store and manage property images with Cloudinary.
- Send property inquiries by email using Resend and React Email.

### Localization & User Experience

- English and Arabic language support using next-intl.
- Responsive layouts for desktop and mobile screens.
- Client-side state management with Zustand.

## 🧰 Tech Stack

| Area | Technologies |
|---|---|
| Framework | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Authentication | Better Auth, Google OAuth |
| State Management | Zustand |
| Internationalization | next-intl |
| Image Management | Cloudinary |
| Email | Resend, React Email |
| Deployment | Vercel |

## 🌍 Internationalization

The application supports both English and Arabic. Locale-aware routing and translation messages are managed with `next-intl`.

## 🗄️ Data Model

The application uses Prisma with PostgreSQL. Its data layer includes authentication-related records and property listings. Each property listing is associated with its owner.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or pnpm.
- A PostgreSQL database.
- Credentials for the external services used by the application, such as Google OAuth, Cloudinary, and Resend.

### Installation

```bash
git clone https://github.com/NancyRashid123/Next-Estate.git
cd Next-Estate
npm install
```


## Environment Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
# Database
DATABASE_URL="your_database_url"

# Direct (unpooled) connection for Prisma CLI
DATABASE_URL_UNPOOLED="your_unpooled_database_url"

# Better Auth
BETTER_AUTH_SECRET="your_better_auth_secret"
BETTER_AUTH_URL="your_better_auth_url"
NEXT_BASE_URL="your_next_base_url"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Resend
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM_ADDRESS="your_email_from_address"
```

Replace the placeholder values with your actual credentials and configuration.


### Database Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

For a fresh database, follow the schema setup workflow configured in the repository's Prisma configuration.

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

## ☁️ Deployment

Deployed on Vercel:

[Live Demo](https://next-estate-plum.vercel.app/)

Add the required database and third-party service environment variables to the Vercel project settings.

## 👩‍💻 Author

**Nancy Rashid**

[GitHub](https://github.com/NancyRashid123)

[Repository](https://github.com/NancyRashid123/Next-Estate)

