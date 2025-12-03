# OVARC TASK


## Tech Stack
- **Vite**: Fast build tool and dev server.
- **React Router**: Dynamic routing with code splitting.
- **Tailwind CSS**: Utility-first CSS framework.
- **@tanstack/react-table**: Powerful table component with sorting and pagination.
- **json-server**: Mock REST API server for development.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the mock server** (in a separate terminal):
   ```bash
   npm run mock-server
   ```
   This will start the JSON server on `http://localhost:5000`

3. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_USE_MOCK=true
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Features

### 1. Shop Page
- Displays a list of cards containing book cover pages, titles, authors, and store availability.
- "Sell" button marks books as sold while keeping the card visible on the page.

### 2. Authors Page
- Simple list of authors with inline editing and delete functionality.
- Modal for adding new authors.
- Search functionality to filter authors.

### 3. Books Page
- List of books showing page count and author information.
- Inline editing for book titles.
- Search functionality to filter books.

### 4. Stores Page
- List of all stores with their details.
- Each row is clickable and navigates to the store's inventory page.

### 5. Store Inventory Page
This is the core feature where administrators manage store inventory. It includes:

#### View Modes
- **Books View**: Displays all books in the store in a table format.
- **Authors View**: Groups books by author for easier browsing.

#### Table Features
- **Columns**: Book Id, Name, Pages, Author, Price, and Actions
- **Sorting**: Click on any column header to sort by that column
- **Search**: Use the search bar to filter books by any field
- **Inline Price Editing**: Click the "Edit" button next to the price to edit it inline
- **Delete Functionality**: Remove books from the store inventory

#### Add New Books
- Click "Add to inventory" button to open a modal
- Select a book from the dropdown (shows up to 7 books initially)
- Search for books by title in the dropdown
- Set the price for the book in the store
- Only books not already in the inventory are shown in the dropdown

#### Authentication Protection
- All actions (Add, Edit, Delete) require user authentication
- Non-authenticated users see disabled buttons and receive alerts when attempting actions
- Sign in via the "Sign In" button in the top-right corner

### 6. Authentication System
- **Sign In/Sign Out**: Functional authentication with mock user data
- **Session Persistence**: User sessions are stored in localStorage
- **Protected Actions**: Inventory management actions are restricted to authenticated users
- **User Profile Display**: Shows logged-in user's name in the topbar

## Authentication

### Demo Credentials
The following test accounts are available:

1. **Admin User**:
   - Email: `admin@example.com`
   - Password: `admin123`

2. **Regular User**:
   - Email: `user@example.com`
   - Password: `user123`

3. **Manager User**:
   - Email: `manager@example.com`
   - Password: `manager123`

### How to Sign In
1. Click the "Sign In" button in the top-right corner of any page
2. Enter your email and password
3. Click "Sign In"
4. Your name will appear in the topbar, and you'll have access to all inventory management features

### Sign Out
Click the "Sign Out" button in the top-right corner to end your session.

## Mock Server API

The mock server runs on `http://localhost:5000` and provides the following endpoints:

### Endpoints
- `GET /stores` - Get all stores
- `GET /stores/:id` - Get a specific store
- `GET /books` - Get all books
- `GET /books/:id` - Get a specific book
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get a specific author
- `GET /inventory` - Get all inventory items
- `GET /inventory/:id` - Get a specific inventory item
- `POST /inventory` - Add a new inventory item
- `PATCH /inventory/:id` - Update an inventory item (e.g., price)
- `DELETE /inventory/:id` - Delete an inventory item
- `GET /users?email=:email` - Get user by email (for authentication)

### Mock Data Structure
The mock data is stored in `mock/db.json` and includes:
- **stores**: Store information
- **books**: Book catalog with titles, pages, and author references
- **authors**: Author information
- **inventory**: Store inventory linking books to stores with prices
- **users**: User accounts for authentication

## Project Structure
```
src/
├── pages/              # Page components
│   ├── StoreInventory.jsx  # Main inventory management page
│   ├── BrowseStores.jsx
│   ├── Browse.jsx
│   ├── BrowseAuthors.jsx
│   └── Loading.jsx
├── components/         # Reusable UI components
│   ├── Table/          # Table components
│   ├── ActionButton/   # Action button components
│   ├── Modal.jsx       # Generic modal component
│   ├── Header.jsx      # Page header with search and add button
│   ├── Searchbar.jsx   # Search input component
│   ├── SignInModal.jsx # Authentication modal
│   └── Topbar.jsx      # Top navigation bar
├── contexts/           # React Context providers
│   └── AuthContext.jsx # Authentication context
├── hooks/              # Custom React hooks
│   └── useLibraryDataWithMock.js  # Data fetching hook
├── assets/             # Static assets (images, etc.)
└── App.jsx             # Main app component with routing

mock/
└── db.json             # Mock database for json-server
```

## Routes
- `/` - Home page with sections for Stores, Books, and Authors
- `/browse-stores` - Browse all stores with their book counts and average prices
- `/browse` - Browse all books with their authors and store availability
- `/browse-authors` - Browse all authors with their published book counts
- `/store/:storeId` - Store inventory page (requires authentication for actions)

## Development Notes

### State Management
- **Local State**: Component-level state using `useState` for UI interactions
- **Context API**: `AuthContext` for global authentication state
- **URL State**: `useSearchParams` for search terms and view modes
- **Route Params**: `useParams` for store-specific data

### Performance Optimizations
- `useMemo` for expensive computations (filtered books, table columns)
- `useCallback` for event handlers to prevent unnecessary re-renders
- Lazy loading for route components
- Memoized table columns and data

### Error Handling
- Network error handling with fallback to local state
- User-friendly error messages in authentication flow
- Graceful degradation when mock server is unavailable

## Troubleshooting

### Mock Server Not Running
If you see errors related to API calls, ensure the mock server is running:
```bash
npm run mock-server
```

### Authentication Issues
- Clear localStorage if you encounter authentication problems
- Ensure the mock server is running before signing in
- Check browser console for detailed error messages

### Build Issues
- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

## License
This project is part of the OVARC task assignment.

