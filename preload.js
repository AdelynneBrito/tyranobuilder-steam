const { contextBridge, ipcRenderer } = require('electron');

// Expose Steam functions to the game
contextBridge.exposeInMainWorld('steamAPI', {
  unlockAchievement: (achievementName) => {
    return ipcRenderer.invoke('steam-unlock-achievement', achievementName);
  },

  getAchievement: (achievementName) => {
    return ipcRenderer.invoke('steam-get-achievement', achievementName);
  },

  clearAchievement: (achievementName) => {
    return ipcRenderer.invoke('steam-clear-achievement', achievementName);
  },

  // Get Steam username
  getUsername: () => {
    return ipcRenderer.invoke('steam-get-username');
  }
});

console.log('Steam API bridge loaded!');
