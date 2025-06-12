# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start the Electron app in development mode
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint linter
- `npm run package` - Package the app for distribution
- `npm run make` - Build distributable packages for multiple platforms

## Architecture Overview

This is an Electron-based todo application with React frontend, built using TypeScript. The app features time tracking, drag-and-drop task reordering, Google Calendar integration, and external API endpoints for task management.

### Main Process (src/index.ts)
- Electron main process with Express server running on port 3001
- Handles file I/O operations in `~/.local/share/oreno-todo-app/`
- Provides IPC handlers for command execution and Google Calendar integration
- Exposes REST API endpoints: `/addTask`, `/stopTodos`, `/reload`

### Renderer Process (src/App.tsx)
- React application using Chakra UI for components
- Drag-and-drop functionality via react-dnd
- State management through React hooks with debounced persistence
- Displays 35 days of weekdays with todo lists for each date

### Data Architecture
- **Todo**: Core task entity with time tracking, taskcode categorization
- **Project**: Grouping mechanism for todos by taskcode and date  
- **Time**: Time tracking records with start/end timestamps
- **Timecard**: Daily time tracking summaries

### Component Structure
- **Atomic Design Pattern**: atoms → molecules → organisms → templates
- **Key Components**:
  - `TodoList`: Main todo rendering and management
  - `QuickTaskcode`: Quick time tracking buttons per project
  - `AccumulatedTime`: Time visualization charts using Recharts

### External Integrations
- **Google Calendar**: Python script integration for event fetching
- **Raycast**: Bash script for quick task addition via `add_task.sh`
- **Notepad**: Markdown file generation for task documentation

### Data Persistence
- JSON files stored locally: `todo_list.json`, `project.json`, `timecard.json`, `quick_taskcode.json`
- Auto-save with 500ms debounce on todo changes
- Daily markdown files for task notes (format: `YYYY-MM-DD.md`)

## Key Features
- Time tracking with start/stop functionality
- Task categorization via taskcodes
- Meeting integration from Google Calendar
- Drag-and-drop task reordering
- External API for task creation (Raycast integration)
- Automatic notepad generation in markdown format