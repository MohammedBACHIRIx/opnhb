# OpenKnowledge Hub

A clean, fast, and searchable multilingual platform for curated technical learning resources.

## Features

- **Multilingual Support**: English, Arabic, and French interface
- **Advanced Search**: Full-text search across titles, descriptions, tags, and notes
- **Resource Management**: Comprehensive admin dashboard for managing resources
- **Learning Paths**: Curated collections of resources for structured learning
- **AI Assistant**: Intelligent resource recommendations powered by PostgreSQL full-text search
- **Legal Compliance**: Automatic detection and flagging of potentially problematic content
- **Click Tracking**: Analytics on resource popularity and usage
- **Dark/Light Mode**: User preference-based theme switching

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Supabase Auth (ready for integration)
- **Internationalization**: next-intl
- **File Processing**: papaparse for CSV imports

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd openknowledge-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials and Supabase configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/openknowledge_hub?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Open Prisma Studio for database management
npm run db:studio
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   ├── admin/              # Admin dashboard pages
│   ├── resource/           # Resource detail pages
│   ├── browse/             # Browse resources page
│   ├── learning-paths/     # Learning paths page
│   ├── assistant/          # AI assistant page
│   ├── about/              # About page
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── navigation.tsx      # Main navigation
│   ├── hero-section.tsx    # Hero section component
│   └── ...                 # Other components
├── lib/
│   ├── db.ts               # Database connection
│   └── utils.ts            # Utility functions
├── prisma/
│   └── schema.prisma       # Database schema
└── types/
    └── index.ts            # TypeScript type definitions
```

## Database Schema

The application uses the following main models:

- **Resource**: Core resource data with multilingual notes support
- **LearningPath**: Curated collections of resources
- **LearningPathItem**: Junction table for ordered resources in paths
- **Report**: User reports for problematic content

## Key Features Implementation

### Multilingual Notes
Resources support multilingual notes stored as JSON:
```json
{
  "en": "English notes",
  "ar": "الملاحظات بالعربية", 
  "fr": "Notes en français"
}
```

### Legal Content Detection
The system automatically flags content containing:
- "torrent"
- "z-library" 
- "piratebay"

Flagged resources are marked with `legalStatus: 'pirate'` and `verified: false`.

### Full-Text Search
PostgreSQL full-text search is implemented across:
- Resource titles
- Descriptions  
- Tags
- Multilingual notes

### Click Tracking
Click tracking is implemented via API endpoint `/api/resources/[id]/click` which increments the click counter when users access external resources.

## Admin Dashboard

The admin dashboard provides:
- **Statistics Overview**: Resource counts, verification status, reports
- **Bulk Import**: CSV/Excel file upload with automatic pirate detection
- **Resource Management**: Full CRUD operations with data table interface
- **Reports Management**: Review and resolve user reports

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:studio      # Open Prisma Studio

# Lint code
npm run lint
```

## Deployment

The application is ready for deployment to Vercel, Netlify, or any Node.js hosting platform. Ensure environment variables are properly configured for production.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Legal Notice

This platform indexes publicly available links for educational purposes only. We do not host or promote illegal content. Users may report problematic links through the built-in reporting system.

---

Built with ❤️ using Next.js, TypeScript, and PostgreSQL.