# Digital Library - Audiobook & eBook Player

A modern, offline-capable digital library application for audiobooks and ebooks with Progressive Web App (PWA) support.

## Features

### 🎧 Audiobook Player
- **Multi-book Support**: Browse and select from multiple books
- **Chapter Navigation**: Easy chapter selection and navigation
- **Multi-part Chapters**: Support for chapters split into multiple audio files
- **Playback Controls**: Play/pause, skip 30s forward/backward, speed control (0.75x to 2x)
- **Progress Tracking**: Visual progress bar with current time and duration
- **Auto-resume**: Remembers your position when you return

### 📱 Offline Support
- **Download for Offline**: Download entire books for offline listening
- **Smart Caching**: Uses IndexedDB for persistent storage
- **Offline Indicator**: Shows online/offline status
- **Background Downloads**: Download progress with visual feedback

### 🎨 Modern UI
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Book Cards**: Visual book selection with cover images
- **Clean Player Interface**: Intuitive controls and progress display
- **PWA Support**: Installable as a native app

## File Structure

```
/
├── index.html              # Main application
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker
├── package.json           # Project configuration
├── scripts/
│   └── generate-book-config.js  # Auto-generate book config
├── books/
│   ├── config.json        # Books configuration
│   └── [book-id]/
│       ├── audio/         # Audio files
│       │   └── [chapter-folders]/
│       │       └── *.mp3  # Audio parts
│       │   └── [book-cover.jpg]
│       └── text/          # Text versions (future)
└── icons/                 # PWA icons
```

## Book Structure

Each book follows this structure:

```
books/48laws/
├── 48-laws.png           # Book cover
├── audio/                # Audio chapters
│   ├── 01_CHAPTER_NAME/
│   │   ├── 001_PART_1.mp3
│   │   ├── 002_PART_2.mp3
│   │   └── ...
│   └── 02_CHAPTER_NAME/
│       └── ...
└── text/                 # Text version (future)
```

## Usage

### Starting the Application

1. **Local Development**:
   ```bash
   npm start
   # or
   python3 -m http.server 8000
   ```

2. **Open in Browser**:
   Navigate to `http://localhost:8000`

### Adding New Books

1. **Create Book Directory**:
   ```
   books/[book-id]/
   ├── audio/
   └── [book-cover.jpg]
   ```

2. **Organize Audio Files**:
   - Create folders for each chapter: `01_CHAPTER_NAME/`
   - Place audio files in each chapter folder
   - Use consistent naming: `001_PART_NAME.mp3`

3. **Generate Configuration**:
   ```bash
   npm run generate-config
   ```

4. **Update Config** (if needed):
   Edit `books/config.json` to add book metadata

### Book Configuration Format

```json
{
  "books": [
    {
      "id": "book-id",
      "title": "Book Title",
      "titleUkrainian": "Назва Українською",
      "cover": "cover.jpg",
      "author": "Author Name",
      "description": "Book description",
      "hasAudio": true,
      "hasText": false,
      "audioPath": "books/book-id/audio",
      "textPath": "books/book-id/text",
      "language": "uk",
      "chapters": [
        {
          "number": 1,
          "title": "Chapter Title",
          "folder": "01_CHAPTER_FOLDER",
          "parts": ["001_PART_1.mp3", "002_PART_2.mp3"]
        }
      ]
    }
  ]
}
```

## Current Books

- **48 Laws of Power** (`48laws`) - 51 chapters with multiple parts each
  - Ukrainian audiobook version
  - Complete with all audio parts
  - Ready for offline download

## Technical Features

### Offline Storage
- **IndexedDB**: Persistent storage for audio files
- **localStorage**: User preferences and progress
- **Service Worker**: PWA caching and offline support

### Audio Features
- **HTML5 Audio**: Native browser audio support
- **Blob URLs**: Efficient cached file playback
- **Multiple Formats**: MP3 support (extensible)

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Touch-friendly**: Large buttons and touch targets
- **Adaptive Layout**: Works on all screen sizes

## Development

### Prerequisites
- Modern web browser with HTML5 audio support
- Local web server (Python, Node.js, etc.)
- Node.js (for configuration generation)

### Scripts
- `npm start` - Start development server
- `npm run generate-config` - Generate book configuration
- `npm run serve` - Serve application

### Browser Support
- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

- 📖 Text reader support
- 🔍 Search functionality
- 📚 Multiple library support
- 🎨 Themes and customization
- 📊 Reading/listening statistics
- ☁️ Cloud synchronization
- 🎵 Playlist support

## License

MIT License - feel free to use and modify for your projects. 