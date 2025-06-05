# Fortnite Accounts Marketplace

A pixel-perfect implementation of a Fortnite accounts marketplace based on a Figma design, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on both desktop and mobile devices
- Product listing with filtering and sorting capabilities
- Modern UI with pixel-perfect implementation of design
- Custom ToggleSwitch component for enhanced user experience
- Mobile-friendly search and filter functionality
- Interactive product cards with hover effects
- Add new products via a modal form
- API integration with Next.js API routes
- Dark theme with custom color scheme

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Axios for API requests
- React Icons for UI icons

## Components

The application consists of several key components:

- **Header**: Navigation bar with search, user profile, and cart
- **ProductGrid**: Displays products in a responsive grid with sorting options
- **ProductCard**: Individual product display with badges, pricing, and features
- **SearchFilter**: Advanced filtering for products including price range and options
- **MobileFilterModal**: Mobile-friendly filtering interface
- **ToggleSwitch**: Reusable toggle component for boolean options
- **FilterTags**: Horizontal scrollable tags for quick filtering
- **MobileSearchButton**: Trigger for mobile search interface

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd marketplace
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app`: Next.js App Router files
  - `/api`: API routes
  - `/components`: React components
  - `/data`: Mock data
  - `/types`: TypeScript type definitions
- `/public`: Static assets

## API Endpoints

- `GET /api/products`: Fetch all products
- `POST /api/products`: Add a new product

## Design Implementation

The implementation follows the Figma design with pixel-perfect accuracy, including:

- Color scheme with dark theme
- Typography and spacing
- Responsive layout for desktop and mobile
- Interactive elements like filters, toggles, and buttons
- Custom shadows and hover effects
- Consistent badge styling and iconography
- Properly aligned text and elements

## Troubleshooting

If you encounter any issues with Tailwind CSS not applying styles correctly, try these steps:

1. Make sure you have the correct versions of dependencies in package.json:
   - tailwindcss: ^3.4.0
   - postcss: ^8.4.32
   - autoprefixer: ^10.4.16

2. Check that your tailwind.config.ts file includes all the necessary content paths:
   ```js
   content: [
     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
     "./components/**/*.{js,ts,jsx,tsx,mdx}",
     "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   ```

3. Ensure your globals.css file has the proper Tailwind directives at the top:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. If styles are still not applying, try rebuilding the project:
   ```bash
   npm run build
   npm start
   ```

## Future Improvements

- Server-side rendering for product listings
- Persistent storage with a database
- User authentication and account management
- Advanced filtering and search capabilities
- Product detail pages
- Wishlist functionality
- Reviews and ratings system

## License

This project is licensed under the MIT License.
