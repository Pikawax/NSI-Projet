document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const content = document.getElementById("content");

    // Vérifier si un mot-clé a été sauvegardé pour la recherche sur plusieurs pages
    let savedSearch = localStorage.getItem("searchTerm");
    if (savedSearch) {
        searchInput.value = savedSearch;
        performSearch(savedSearch);
        localStorage.removeItem("searchTerm");
    }

    // Fonction de recherche
    function performSearch(searchTerm) {
        let text = content.innerHTML;
        
        // Réinitialiser le texte avant la recherche
        content.innerHTML = text.replace(/<mark>(.*?)<\/mark>/g, "$1");

        if (searchTerm) {
            let regex = new RegExp(searchTerm, "gi");
            content.innerHTML = text.replace(regex, match => `<mark>${match}</mark>`);

            // Faire défiler jusqu'au premier mot trouvé
            let firstMatch = document.querySelector("mark");
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }

    // Événement au clic sur la loupe
    searchBtn.addEventListener("click", function() {
        let searchTerm = searchInput.value.toLowerCase();
        performSearch(searchTerm);
    });

    // Événement lorsqu'on appuie sur "Entrée"
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let searchTerm = searchInput.value.toLowerCase();
            performSearch(searchTerm);
        }
    });

    // Sauvegarder la recherche pour l'utiliser sur une autre page
    searchBtn.addEventListener("click", function() {
        let searchTerm = searchInput.value.trim();
        if (searchTerm) {
            localStorage.setItem("searchTerm", searchTerm);
            window.location.href = "page2.html"; // Remplace par le lien de ta deuxième page
        }
    });
});
