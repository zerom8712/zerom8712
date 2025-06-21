const fs = require('fs');
const path = require('path');

// Function to clean up folder names for display
function cleanTitle(folderName) {
    // Remove number prefix and underscores, convert to readable format
    return folderName
        .replace(/^\d+_/, '') // Remove number prefix
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/[А-ЯЁІЇЄ]/g, match => match) // Keep Ukrainian characters
        .trim();
}

// Function to scan audio directory and generate config
function generateBookConfig(bookPath, bookId) {
    const audioPath = path.join(bookPath, 'audio');
    
    if (!fs.existsSync(audioPath)) {
        console.error(`Audio path does not exist: ${audioPath}`);
        return null;
    }
    
    const chapters = [];
    const chapterFolders = fs.readdirSync(audioPath)
        .filter(item => fs.statSync(path.join(audioPath, item)).isDirectory())
        .sort(); // Sort alphabetically
    
    chapterFolders.forEach((folder, index) => {
        const chapterPath = path.join(audioPath, folder);
        const audioFiles = fs.readdirSync(chapterPath)
            .filter(file => file.endsWith('.mp3'))
            .sort(); // Sort audio files
        
        // Extract chapter number from folder name
        const numberMatch = folder.match(/^(\d+)_/);
        const chapterNumber = numberMatch ? parseInt(numberMatch[1]) : index + 1;
        
        const chapter = {
            number: chapterNumber,
            title: cleanTitle(folder),
            folder: folder,
            parts: audioFiles
        };
        
        chapters.push(chapter);
    });
    
    // Sort chapters by number
    chapters.sort((a, b) => a.number - b.number);
    
    return {
        id: bookId,
        title: "48 Laws of Power",
        titleUkrainian: "48 Законів Влади",
        cover: "48-laws.png",
        author: "Robert Greene",
        description: "Ukrainian audiobook version of the 48 Laws of Power",
        hasAudio: true,
        hasText: true,
        audioPath: `books/${bookId}/audio`,
        textPath: `books/${bookId}/text`,
        language: "uk",
        chapters: chapters
    };
}

// Generate config for the 48laws book
const bookConfig = generateBookConfig('./books/48laws', '48laws');

if (bookConfig) {
    const fullConfig = {
        books: [bookConfig]
    };
    
    // Write to config file
    const configPath = './books/config.json';
    fs.writeFileSync(configPath, JSON.stringify(fullConfig, null, 2));
    
    console.log(`Generated config for ${bookConfig.chapters.length} chapters`);
    console.log(`Config saved to: ${configPath}`);
    
    // Print first few chapters for verification
    console.log('\nFirst few chapters:');
    bookConfig.chapters.slice(0, 5).forEach(chapter => {
        console.log(`${chapter.number}. ${chapter.title} (${chapter.parts.length} parts)`);
    });
} else {
    console.error('Failed to generate book config');
} 