# AlgoVisual Documentation

## Overview

AlgoVisual is an interactive algorithm visualization platform designed to help engineering students understand complex Data Structures and Algorithms through visual representations and AI-powered explanations.

## Features

- **Interactive Visualizations**: Real-time step-by-step algorithm execution with customizable speed
- **AI-Powered Insights**: Deep analysis and explanations powered by Google Gemini AI
- **Multiple Algorithm Categories**:
  - Sorting Algorithms
  - Searching Algorithms
  - Graph Algorithms
  - Tree Algorithms
  - Dynamic Programming
  - String Algorithms
  - Linked List Operations
  - Mathematical Algorithms
  - Geometry Algorithms
- **Custom Data Input**: Users can input their own data for visualization
- **Step-by-Step Navigation**: Forward and backward controls for detailed analysis
- **Multiple Layout Views**: Toggle between different visualization layouts
- **Fullscreen Mode**: Immersive visualization experience
- **Zoom Controls**: Zoom in/out for better visibility
- **Real-time Feedback**: Local feedback system for user suggestions and bug reports

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Visualization**: D3.js
- **AI Integration**: Google Gemini API
- **Styling**: TailwindCSS
- **Icons**: Font Awesome
- **Markdown Rendering**: react-markdown with remark-gfm

## Project Structure

```
algovisual/
├── algorithms/           # Algorithm implementations
│   ├── registry.ts      # Algorithm registry and exports
│   ├── sorting/         # Sorting algorithms
│   ├── searching/       # Searching algorithms
│   ├── graphs/          # Graph algorithms
│   ├── trees/           # Tree algorithms
│   └── ...
├── components/          # React components
│   ├── AboutPage.tsx    # About and feedback page
│   ├── HomePage.tsx     # Landing page
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Visualizer.tsx   # Main visualization component
│   ├── Snackbar.tsx     # Notification component
│   ├── CustomInputModal.tsx
│   └── ShareButton.tsx
├── services/            # External service integrations
│   └── geminiService.ts # Google Gemini API integration
├── App.tsx             # Main application component
├── constants.ts        # Color constants and algorithm definitions
├── types.ts            # TypeScript type definitions
└── vite.config.ts      # Vite configuration
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rohithdgrr/RAGYU-ALGOVISUAL.git
cd algovisual
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory and add your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Color Legend

The visualization uses the following color scheme:

- **#e2e8f0 (Gray)** - Default/Unvisited elements
- **#3b82f6 (Blue)** - Active/Pivot element
- **#f59e0b (Amber)** - Comparing elements
- **#10b981 (Green)** - Sorted/Visited elements
- **#ef4444 (Red)** - Target/Error elements

## AI Features

### Deep Analysis

Click the "Analyze Algorithm" button in the Deep Analysis tab to get:
- Detailed time complexity breakdown (Best, Average, Worst case)
- Space complexity analysis
- Real-world applications
- Pros and cons
- Context-aware explanations based on current visualization state

### Chat with AI

Ask specific questions about algorithms, steps, or optimizations in the chat interface. The AI is aware of the current visualization state and can explain color meanings and algorithm mechanics.

## Controls

### Visualization Controls

- **Visualize/Stop Button**: Start or stop the algorithm visualization
- **Step Forward/Backward**: Navigate through algorithm steps
- **Reset**: Reset visualization to initial state
- **Custom Data**: Input your own data for visualization
- **Change Shape**: Toggle between different layout views
- **Speed Slider**: Adjust animation speed (50ms - 2000ms)
- **Zoom In/Out**: Zoom the visualization canvas
- **Fullscreen**: Enter fullscreen mode for immersive experience

### Navigation

- **Sidebar**: Navigate between different algorithm categories
- **About & Feedback**: View creator information and submit feedback
- **Platform Overview**: Return to home page

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Algorithms

1. Implement the algorithm in the appropriate category folder under `algorithms/`
2. Register it in `algorithms/registry.ts`
3. Add it to the algorithm definitions in `constants.ts`
4. Test the visualization thoroughly

## Troubleshooting

### API Key Issues

If you see "API Key is missing" error:
- Ensure `.env.local` file exists in the root directory
- Verify the variable name is `VITE_GEMINI_API_KEY`
- Restart the development server after adding the key

### Visualization Not Working

- Check browser console for errors
- Ensure D3.js is properly loaded
- Try resetting the visualization
- Clear browser cache and reload

### Build Errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is compatible

## License

This project is open source and available under the MIT License.

## Credits

- **Creator**: ROT (B.Tech Student from Warangal, Telangana)
- **GitHub**: [RAGYU-ALGOVISUAL](https://github.com/Rohithdgrr/RAGYU-ALGOVISUAL)

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Use the feedback form in the application
- Contact via the GitHub repository

---

Made with ❤️ by ROT
