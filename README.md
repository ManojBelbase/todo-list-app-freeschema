# To-Do List Application

A professional, feature-rich To-Do List application built with the **FreeSchema Data Fabric** framework by [Mentor Friends Pvt. Ltd.](https://mentorfriends.com)



## Overview

This application is a robust task management system leveraging the FreeSchema Data Fabric for high-performance data persistence and synchronization. It features a modern UI, secure authentication routing, and reliable real-time updates.

## Features

### Core Functionality
- **Authentication** - Integrated login and registration system.
- **Create Tasks** - Add new items with instant server synchronization.
- **List Tasks** - Real-time task display with status indicators.
- **Edit Tasks** - Smooth update flow for task descriptions and status.
- **Delete Tasks** - Secure deletion with custom modal confirmation.
- **Stability** - Automatic and manual reloads to ensure 100% data consistency.

### User Experience
- **Modern UI** - Clean, gradient-based design with professional aesthetics.
- **Responsive** - Optimized for mobile, tablet, and desktop viewing.
- **Visual Feedback** - Inline error messages and loading states instead of alerts.
- **Restricted Actions** - Completed tasks are locked from editing for data integrity.
- **Custom Modal** - Replaces generic browser dialogs for a premium feel.

## Getting Started

### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn**

### Installation & Running

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Access the App**
   Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── app/
│   ├── environments/
│   │   └── environment.dev.ts          # Environment configuration
│   ├── interfaces/
│   │   ├── IRoute.interface.ts         # Route interfaces
│   │   └── IUser.interface.ts          # User interfaces
│   ├── pages/
│   │   ├── todo/
│   │   │   ├── components/
│   │   │   │   ├── todoForm.index.ts   # Task Creation Form
│   │   │   │   ├── todoList.index.ts   # Task List Display
│   │   │   │   └── todoDelete.index.ts # Task Deletion Modal
│   │   │   └── todoPage.index.ts       # Main Todo Page
│   │   ├── user/
│   │   │   ├── login.index.ts          # Login Page
│   │   │   ├── register.index.ts       # Register Page
│   │   │   └── login.service.ts        # Auth Service
│   ├── routes/
│   │   ├── routes.ts                   # Route definitions
│   │   └── renderRoute.service.ts      # Routing engine
│   └── styles/
│       └── todo.style.css              # Todo application styles
├── main.ts                             # Application entry point
├── style.css                           # Global styles
└── index.html                          # HTML entry point
```

## FreeSchema Integration

Developed using `mftsccs-browser`, the app demonstrates advanced FreeSchema patterns:

- **StatefulWidget**: Used for all modular UI components.
- **FreeschemaQuery**: Implements reactive listeners that update the list automatically.
- **LocalSyncData**: Ensures all local changes are persisted to the backend fabric.
- **Concept Hierarchy**: Tasks are modeled as primary concepts with connection-based properties.


