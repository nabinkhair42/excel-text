I'll write the README.md content directly to the file:

```markdown:backend/README.md
# Excel Processing Backend API

A TypeScript-based Express.js backend service that handles Excel file processing and provides RESTful API endpoints.

## Features

- Excel file upload and processing
- Robust error handling
- CORS configuration for secure frontend communication
- Environment variable validation using Zod
- Structured logging system

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3001
PRODUCTION_FRONTEND_URL=https://your-production-url.com
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build the project
npm run build

# Start production server
npm start

# Run TypeScript type checking
npm run type-check
```

## API Endpoints

### Base URL
`http://localhost:3000` (development)

### Endpoints

#### GET /
- Description: Server health check
- Response: Text message confirming server is running

#### GET /hello
- Description: Test endpoint
- Response: "Hello World"

#### POST /upload
- Description: Upload and process Excel files
- Request:
  - Method: POST
  - Content-Type: multipart/form-data
  - Body: file (Excel file)
- Response:
  ```json
  {
    "message": "File uploaded and processed successfully",
    "data": {
      "headers": ["Column1", "Column2"],
      "rows": [
        {
          "Column1": "value1",
          "Column2": "value2"
        }
      ]
    }
  }
  ```

## File Upload Specifications

- Supported formats: .xls, .xlsx
- Maximum file size: 5MB
- Accepted MIME types:
  - application/vnd.ms-excel
  - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  - application/octet-stream

## Error Handling

The API implements comprehensive error handling:
- Invalid file types
- File size limits
- Excel processing errors
- Environment variable validation

## Security

- CORS configuration for frontend communication
- File type validation
- Request size limits

## Project Structure

```
src/
├── app.ts              # Express app configuration
├── server.ts           # Server startup
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── config/            # Configuration files
├── routes/            # API routes
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── zod/               # Schema validation
```
