# SQL Query Editor Application

## Overview

This SQL Query Editor application allows users to run SQL queries and view the results in a tabular format. The application includes predefined queries with corresponding results, and for any new or custom queries, it displays random outputs from a set of dummy data.

## Features

- **SQL Query Editor**: A dedicated space for users to input and execute SQL queries
- **Query History**: View previously executed queries with timestamps.
- **Saved Queries**: Option to save frequently used queries for quick access
- **Filterable Results**: Each column in the results table can be filtered to narrow down data
- **Sortable Columns**: Click on column headers to sort data in ascending or descending order
- **Pagination**: Efficiently handle large datasets by displaying results in manageable chunks
- **Theme Switcher**: Toggle between light and dark themes for comfortable viewing
- **Export Functionality**: Download query results in multiple formats:
  - CSV
  - JSON
  - Excel

## Tech Stack

### JavaScript Framework

- React.js

### Key Packages

- react-syntax-highlighter (v15.6.1) - For SQL syntax highlighting
- Vite (v6.2.0) - For fast development and optimized builds

## Load Time

## Performance Measurement

- Load time was measured using the Network tab in browser developer tools

## Optimizations

- Implemented pagination to efficiently handle large datasets without browser performance issues
- Used native emoji characters instead of importing an icon library to reduce bundle size
- Implemented React's `useMemo` hook when rendering result tables to prevent unnecessary re-renders
- Only re-rendering components when data actually changes, improving overall application performance

## Deployment

- The application is deployed on Vercel
