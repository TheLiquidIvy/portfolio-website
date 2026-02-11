# 📋 Task Matrix

A beautiful, interactive Kanban board with smooth drag-and-drop functionality, multiple views, animated progress tracking, and confetti celebrations - all in a stunning cyberpunk theme.

![Task Matrix](https://img.shields.io/badge/Frontend-Project-00ffff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-ff00ff?style=for-the-badge)
![Drag&Drop](https://img.shields.io/badge/DragDrop-HTML5-00ff41?style=for-the-badge)

## ✨ Features

### 🎨 Visual Features
- **Smooth Drag & Drop** - Intuitive HTML5 drag-and-drop with visual feedback
- **Multiple Views** - Switch between Kanban board and list table views
- **Animated Progress Bars** - Shimmer effects on progress indicators
- **Confetti Animation** - Celebration when tasks are completed
- **Color-Coded Priorities** - High (red), Medium (orange), Low (green)
- **Hover Effects** - Beautiful card animations and transitions

### 📊 Functional Features
- **Task Management** - Create, move, and organize tasks
- **Priority System** - Three priority levels with visual indicators
- **Progress Tracking** - Percentage-based progress bars
- **Status Columns** - To Do, In Progress, Done
- **Tag System** - Categorize tasks with custom tags
- **Assignee Management** - Visual avatars for team members
- **Statistics Dashboard** - Real-time task counts and metrics

### 🎯 Interactive Elements
- **Drag and Drop** - Move tasks between columns seamlessly
- **Add New Tasks** - Quick task creation with one click
- **View Switching** - Toggle between Kanban and list views
- **Notifications** - Toast messages for user actions
- **Auto-save** - Simulated automatic saving every 30 seconds

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and drag-and-drop API
- **CSS3** - Grid, flexbox, animations, gradients
- **JavaScript (ES6+)** - Modern vanilla JavaScript
- **No Dependencies** - Pure vanilla implementation

## 📁 Project Structure

```
task-matrix/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Cyberpunk-themed styles
├── js/
│   └── main.js         # Core Kanban functionality
└── README.md           # This file
```

## 🚀 Setup & Usage

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your browser
3. **Start organizing!** No build process required

### Using the Kanban Board

#### Drag and Drop Tasks
1. Click and hold a task card
2. Drag it to a different column
3. Release to drop and update status
4. Progress automatically updates!

#### Add New Tasks
1. Click the "➕ Add Task" button
2. A new task appears in the "To Do" column
3. Drag it to organize your workflow

#### Switch Views
1. Click "📋 Kanban" for board view
2. Click "📄 List" for table view
3. Both views stay synchronized

#### Complete Tasks
- Drag a task to the "Done" column
- Watch the confetti celebration! 🎉
- Progress automatically set to 100%

## 🎮 Features Breakdown

### Drag and Drop System
- **Visual Feedback** - Cards rotate and scale while dragging
- **Drop Zones** - Columns highlight when hovering
- **Smooth Animation** - CSS transitions for natural movement
- **Touch Support** - Works on mobile devices

### Priority System
```javascript
{
  'high': {
    color: '#ff4757',    // Red
    border: 'solid 4px'
  },
  'medium': {
    color: '#ffa502',    // Orange
    border: 'solid 4px'
  },
  'low': {
    color: '#00ff41',    // Green
    border: 'solid 4px'
  }
}
```

### Task Data Structure
```javascript
{
  id: 1,
  title: 'Design system audit',
  description: 'Review and update design tokens',
  status: 'todo',          // todo | progress | done
  priority: 'high',        // high | medium | low
  progress: 0,             // 0-100
  tags: ['Design', 'UX'],
  assignee: 'AM'
}
```

## 🎨 Customization

### Add Your Own Tasks
Edit the `tasks` array in `js/main.js`:

```javascript
let tasks = [
    {
        id: 1,
        title: 'Your Task Title',
        description: 'Your task description',
        status: 'todo',
        priority: 'high',
        progress: 0,
        tags: ['Tag1', 'Tag2'],
        assignee: 'YY'
    },
    // Add more tasks...
];
```

### Modify Colors
Update CSS variables in `css/style.css`:

```css
:root {
    --primary: #00ffff;      /* Cyan */
    --secondary: #ff00ff;    /* Magenta */
    --neon-green: #00ff41;   /* Green */
}
```

### Change Columns
Modify the status columns in `js/main.js`:

```javascript
const columns = ['todo', 'progress', 'done'];
// Add more: ['backlog', 'todo', 'progress', 'review', 'done']
```

## 📱 Responsive Design

- **Desktop** (1200px+): 3-column grid layout
- **Tablet** (768px-1199px): Responsive column sizing
- **Mobile** (<768px): Single column stacked view

## 🎯 Key Interactions

### Keyboard Support (Future Enhancement)
- Arrow keys to navigate tasks
- Enter to open task details
- Delete to remove tasks
- Escape to close modals

### Mouse Interactions
- **Click & Hold** - Start dragging a task
- **Hover** - Preview task details
- **Double Click** - Edit task (future feature)

## 🌟 Advanced Features

### Confetti Animation
When a task is moved to "Done":
```javascript
function triggerConfetti() {
    const colors = ['#00ffff', '#ff00ff', '#00ff41', '#ff00aa'];
    const confettiCount = 50;
    // Create 50 confetti pieces with random colors
    // Animate them falling with rotation
}
```

### Progress Tracking
- Automatically updates based on column
- To Do → 0% progress
- In Progress → Starts at 25%
- Done → 100% progress + confetti! 🎊

### Toast Notifications
Real-time feedback for user actions:
- Task created ✓
- Task moved ✓
- Status updated ✓

## 🔮 Future Enhancements

- [ ] Task editing modal
- [ ] Due dates and calendar view
- [ ] Search and filter functionality
- [ ] Custom column creation
- [ ] Subtasks and checklists
- [ ] File attachments
- [ ] Team collaboration features
- [ ] Export to CSV/JSON
- [ ] Keyboard shortcuts
- [ ] Dark/Light theme toggle
- [ ] Backend integration
- [ ] Real-time sync across devices

## 💡 Use Cases

### Personal Projects
- Track side project tasks
- Organize learning goals
- Plan content creation

### Team Workflows
- Sprint planning
- Bug tracking
- Feature development

### Event Planning
- Wedding preparation
- Conference organization
- Party planning

## 🎓 Learning Highlights

This project demonstrates:
1. **HTML5 Drag & Drop API** - Native browser functionality
2. **DOM Manipulation** - Dynamic rendering and updates
3. **Event Handling** - Complex user interactions
4. **CSS Animations** - Smooth transitions and effects
5. **State Management** - Client-side data handling
6. **Responsive Design** - Mobile-first approach

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as part of Maya Smith's portfolio - demonstrating advanced frontend development and UX design skills.

---

**Pro Tip**: Drag a task to "Done" and watch the magic happen! ✨🎉
