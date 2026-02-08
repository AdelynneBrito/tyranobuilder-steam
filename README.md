# TyranoBuilder + Electron + Steam Integration

This project wraps your TyranoBuilder game in Electron with Steam API integration using steamworks.js.

## Project Structure

```
steam-intregration-test/
├── game/                    # Your TyranoBuilder browser export goes here
│   ├── index.html
│   ├── data/
│   └── tyrano/
├── main.js                  # Electron main process (Steam initialization)
├── preload.js              # Bridge between game and Steam
├── steam-helper.js         # Helper functions for your game
├── package.json            # Project configuration
├── steam_appid.txt         # Steam App ID (480 for testing)
└── README.md               # This file
```

## Setup Instructions

### 1. Install Dependencies

Open a command prompt in this folder and run:

```bash
npm install
```

This will install:
- Electron
- steamworks.js
- electron-builder (for packaging)

### 2. Copy Your Game Files

Copy all your exported TyranoBuilder browser files into the `game/` folder:

- Create a folder called `game` in this directory
- Copy `index.html`, `data/`, `tyrano/`, and all other exported files into `game/`

### 3. Modify Your Game's index.html

Open `game/index.html` and add this line in the `<head>` section:

```html
<script src="../steam-helper.js"></script>
```

This loads the Steam helper functions into your game.

### 4. Testing with Steam

**Important:** Steam must be running for this to work!

Run the game:

```bash
npm start
```

This will launch your game in Electron with Steam integration active.

## Using Steam Achievements in Your Game

### From TyranoScript

You can unlock achievements from your TyranoScript using the `[iscript]` tag:

```
[iscript]
unlockSteamAchievement("ACH_WIN_ONE_GAME");
[endscript]
```

### From JavaScript in Your Game

You can also call these functions directly from any JavaScript in your game:

```javascript
// Unlock an achievement
await unlockSteamAchievement("ACH_WIN_ONE_GAME");

// Check if achievement is unlocked
const isUnlocked = await checkSteamAchievement("ACH_WIN_ONE_GAME");

// Clear achievement (for testing only)
await clearSteamAchievement("ACH_WIN_ONE_GAME");
```

### Available Achievement IDs for App 480 (Spacewar - Testing)

When testing with App ID 480, you can use these achievement IDs:
- `ACH_WIN_ONE_GAME`
- `ACH_WIN_100_GAMES`
- `ACH_TRAVEL_FAR_ACCUM`
- `ACH_TRAVEL_FAR_SINGLE`

### Example TyranoScript Scene

```
[iscript]
// Check Steam username
window.steamAPI.getUsername().then(result => {
  if (result.success) {
    console.log("Hello " + result.username);
  }
});
[endscript]

*start
[bg storage="bg_image.jpg"]
Welcome to the game![l][r]

[iscript]
unlockSteamAchievement("ACH_WIN_ONE_GAME");
[endscript]

You unlocked your first achievement![l][r]
```

## Building for Distribution

Once you're ready to distribute your game:

### 1. Update package.json

- Change `appId` to your game's unique identifier
- Change `productName` to your game's name
- Update other metadata as needed

### 2. Replace App ID

- Change `480` in `steam_appid.txt` to your actual Steam App ID
- Change `480` in `main.js` to your actual App ID

### 3. Build the Executable

```bash
npm run build
```

This creates a distributable executable in the `dist/` folder.

## Troubleshooting

### "Steam not initialized" error
- Make sure Steam is running
- Make sure `steam_appid.txt` exists in the project root
- Check that steamworks.js installed correctly

### Achievement not unlocking
- Verify the achievement ID is correct
- Check the browser console (DevTools) for error messages
- Make sure Steam overlay is enabled for your game

### Game doesn't load
- Check that your game files are in the `game/` folder
- Verify `game/index.html` exists
- Check the DevTools console for errors

## Development Tips

- The game opens with DevTools by default (see `main.js`)
- To disable DevTools for production, comment out: `mainWindow.webContents.openDevTools();`
- Check the console for Steam initialization messages
- Use `clearSteamAchievement()` to reset achievements during testing

## Additional Resources

- [steamworks.js Documentation](https://github.com/ceifa/steamworks.js)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Steamworks Documentation](https://partner.steamgames.com/doc/home)

## Next Steps

1. Copy your TyranoBuilder game files into the `game/` folder
2. Modify `game/index.html` to include the steam-helper.js script
3. Run `npm install`
4. Run `npm start` to test
5. Add achievement unlocks to your game using `unlockSteamAchievement()`

Good luck with your Steam integration!
