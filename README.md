
# Typescript Project: Employee App 😁

## Overview
This project is designed to create a web application that shares humorous jokes with employees to kickstart their workday with a smile

---

## Features

- Retrieve jokes from external APIs.
- Show random jokes sourced from two unique APIs.
- Allow users to rate the jokes for engagement.
- Display current weather details alongside jokes.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Silvitui/typescript-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd typescript-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the project:
   ```bash
   npm run build
   ```

---

## Scripts

The `package.json` includes the following scripts for development and production workflows:

| Script         | Command                                | Description                                             |
|----------------|----------------------------------------|---------------------------------------------------------|
| `build:ts`     | `npm run build:ts`                    | Compiles TypeScript files to JavaScript.                |
| `build:sass`   | `npm run build:sass`                  | Compiles SASS files to CSS.                             |
| `build`        | `npm run build`                       | Executes both TypeScript and SASS build processes.      |
| `watch:ts`     | `npm run watch:ts`                    | Watches TypeScript files for changes and recompiles.    |
| `watch:sass`   | `npm run watch:sass`                  | Watches SASS files for changes and recompiles.          |
| `dev`          | `npm run dev`                         | Starts watchers for both TypeScript and SASS files.     |
| `start`        | `npm run start`                       | Runs the application using Node.js.                     |

---

## Project Structure

```plaintext
typescript-project/
├── src/
│   ├── sass/       # SASS source files
│   ├── ts/         # TypeScript source files
│   └── index.ts    # Entry point
├── dist/
│   ├── css/        # Compiled CSS files
│   ├── js/         # Compiled JavaScript files
│   └── index.js    # Compiled entry point
├── package.json    # Project metadata and scripts
├── tsconfig.json   # TypeScript configuration
└── README.md       # Project documentation
```

---

## Usage

1. Start the development environment:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to the application.
3. Explore and enjoy the daily uplifting messages!

To prepare for production, build the project:
```bash
npm run build
```
The compiled files will be available in the `dist/` directory.

---

## Technologies Used

- **TypeScript**: For type-safe and scalable JavaScript development.
- **SASS**: For advanced styling capabilities and modularity.
- **Bootstrap**: For responsive and modern UI components.

---





