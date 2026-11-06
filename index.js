
const talbar = document.getElementById("talbar");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const ACCESS_KEY = "46UK-E931Aix0MLUzrcXx5UucA-CGPr_jq8TWu-NuHM";
let page = 1;
let query = "";
let loading = false;

const loadPhotos = async () => {
    if (loading) return;
    loading = true;
    loadMoreBtn.disabled = true;

    try {
        const url = query
            ? `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=12`
            : `https://api.unsplash.com/photos?page=${page}&per_page=12`;

        const response = await fetch(url, {
            headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        });
        if (!response.ok) {
            throw new Error(`Алдаа: ${response.status}`);
}
        const data = await response.json();
        const photos = query ? data.results : data;

        if (photos.length === 0 && page === 1) {``
            talbar.innerHTML = `<p class="py-10 text-center text-[#8A8A82]">Зураг олдсонгүй</p>`;}

        photos.forEach((photo) => {
            talbar.innerHTML += `
                <img
                    src="${photo.urls.regular}"
                    alt="${photo.alt_description || "Photo " + photo.id}"
                    class="mb-6 h-auto w-full break-inside-avoid rounded-[20px] object-cover"/>`;});
        page++;
    } catch (error) {
        console.error(error);
    } finally {
        loading = false;
        loadMoreBtn.disabled = false;}
};
const searchPhotos = () => {
    query = searchInput.value.trim();
    page = 1;
    talbar.innerHTML = "";
    loadPhotos();};
searchBtn.addEventListener("click", searchPhotos);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchPhotos();
});
loadMoreBtn.addEventListener("click", loadPhotos);
loadPhotos();