const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const steamworks = require('steamworks.js');

let mainWindow;
let client;

function createWindow() {
  // Initialize Steam
  try {
    client = steamworks.init(480);
    console.log('Steam initialized successfully!');
    console.log('Steam User:', client.localplayer.getName());
  } catch (error) {
    console.error('Failed to initialize Steam:', error);
    // app.quit();
  }

  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'icon.png') // Optional: add your game icon
  });

  // Load the game
  mainWindow.loadFile(path.join(__dirname, 'game', 'index.html'));

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Steam Achievement functions
ipcMain.handle('steam-unlock-achievement', async (event, achievementName) => {
  if (!client) {
    console.error('Steam not initialized');
    return { success: false, error: 'Steam not initialized' };
  }

  try {
    const achievement = client.achievement;
    achievement.activate(achievementName);
    console.log(`Achievement unlocked: ${achievementName}`);
    return { success: true };
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('steam-get-achievement', async (event, achievementName) => {
  if (!client) {
    return { success: false, error: 'Steam not initialized' };
  }

  try {
    const achievement = client.achievement;
    const isAchieved = achievement.isActivated(achievementName);
    return { success: true, achieved: isAchieved };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('steam-clear-achievement', async (event, achievementName) => {
  if (!client) {
    return { success: false, error: 'Steam not initialized' };
  }

  try {
    const achievement = client.achievement;
    achievement.clear(achievementName);
    console.log(`Achievement cleared: ${achievementName}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('steam-get-username', async () => {
  if (!client) {
    return { success: false, error: 'Steam not initialized' };
  }

  try {
    const username = client.localplayer.getName();
    return { success: true, username: username };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// App lifecycle
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

require('steamworks.js').electronEnableSteamOverlay()

// Run Steam callbacks periodically
if (client) {
  setInterval(() => {
    client.runCallbacks();
  }, 100);
}