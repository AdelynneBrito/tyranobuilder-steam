// Steam Helper for TyranoBuilder
// Ensure this is included in index.html: <script src="../steam-helper.js"></script>

// Check if Steam API is available
if (typeof window.steamAPI !== 'undefined') {
  console.log('Steam API detected!');

  // Get Steam username and display it
  window.steamAPI.getUsername().then(result => {
    if (result.success) {
      console.log('Steam User:', result.username);
    }
  });
} else {
  console.warn('Steam API not available. Running without Steam.');
}

window.unlockSteamAchievement = async function(achievementId) {
  if (typeof window.steamAPI === 'undefined') {
    console.warn('Steam not available');
    return false;
  }

  const result = await window.steamAPI.unlockAchievement(achievementId);
  if (result.success) {
    console.log('Achievement unlocked:', achievementId);
    return true;
  } else {
    console.error('Failed to unlock achievement:', result.error);
    return false;
  }
};

window.checkSteamAchievement = async function(achievementId) {
  if (typeof window.steamAPI === 'undefined') {
    return false;
  }

  const result = await window.steamAPI.getAchievement(achievementId);
  return result.success ? result.achieved : false;
};

window.clearSteamAchievement = async function(achievementId) {
  if (typeof window.steamAPI === 'undefined') {
    return false;
  }

  const result = await window.steamAPI.clearAchievement(achievementId);
  return result.success;
};

console.log('Steam helper functions loaded!');
