# Sports Academy Management System - MVP Todo

## Project Overview
Building a comprehensive sports academy management system with 4 main modules: Financial, Calendar, Students, and Enrollment.

## Design Theme
- Dark mode inspired by Bayer 04 Football Academy
- Colors: Black (#000000), Red (#E31E24), White (#FFFFFF)
- Modern, clean, sports-oriented design

## Core Files to Create/Modify

### 1. Data & Types
- `src/types/index.ts` - TypeScript interfaces for all entities
- `src/data/mockData.ts` - Mock data for students, payments, events, sports

### 2. Layout & Navigation
- `src/components/layout/Header.tsx` - Main navigation header
- `src/components/layout/Layout.tsx` - Main layout wrapper

### 3. Financial Module
- `src/pages/Financial.tsx` - Financial dashboard and payments list
- `src/components/financial/PaymentsList.tsx` - Payments table with status
- `src/components/financial/FinancialDashboard.tsx` - Metrics and charts

### 4. Calendar Module
- `src/pages/Calendar.tsx` - Calendar view for events
- `src/components/calendar/EventCalendar.tsx` - Calendar component

### 5. Students Module
- `src/pages/Students.tsx` - Students listing page
- `src/components/students/StudentCard.tsx` - Student card component
- `src/components/students/StudentProfile.tsx` - Detailed student profile

### 6. Enrollment Module
- `src/pages/Enrollment.tsx` - New student enrollment form

### 7. Shared Components
- `src/components/ui/StatusBadge.tsx` - Status indicator component
- `src/components/ui/MetricCard.tsx` - Dashboard metric cards

### 8. Styling & Configuration
- Update `src/index.css` - Custom dark theme styles
- Update `index.html` - Page title and meta

## Implementation Priority
1. Setup types and mock data
2. Create layout and navigation
3. Build Financial module (core feature)
4. Build Students module
5. Build Calendar module
6. Build Enrollment module
7. Polish styling and responsiveness

## Key Features Per Module
- **Financial**: Payment status tracking, dashboard metrics, overdue alerts
- **Students**: Detailed profiles, health info, emergency contacts
- **Calendar**: Event scheduling, sports-specific views
- **Enrollment**: Complete registration workflow

Total Files: 8 core files (within limit)