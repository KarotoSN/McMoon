// Fichier JavaScript pour appliquer automatiquement le thème café
document.addEventListener('DOMContentLoaded', function() {
    // Appliquer le thème café automatiquement
    applyTheme('coffee');
});

// Fonction pour appliquer le thème
function applyTheme(theme) {
    // Retirer toutes les classes de thème précédentes
    document.body.classList.remove('dark', 'theme-coffee', 'theme-mint', 'theme-lavender');
    
    // Ajouter la classe correspondant au thème choisi
    if (theme !== 'light') {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.add(`theme-${theme}`);
        }
    }
    
    // Sauvegarder la préférence
    localStorage.setItem('theme', theme);
    
    // Mettre à jour les méta-tags pour les navigateurs mobiles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {        const themeColors = {
            'light': '#f7fafa',
            'dark': '#1a2928',
            'coffee': '#f9f5f0',
            'mint': '#f0f8f5',
            'lavender': '#f5f3fa'
        };
        metaThemeColor.setAttribute('content', themeColors[theme] || themeColors.light);
    }
}
