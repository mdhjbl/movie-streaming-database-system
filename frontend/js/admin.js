// State
let currentSection = 'movies';
let currentEditId = null;
let allData = [];

// DOM Elements
const adminName = document.getElementById('adminName');
const logoutBtn = document.getElementById('logoutBtn');
const menuItems = document.querySelectorAll('.menu-item');
const sectionTitle = document.getElementById('sectionTitle');
const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('searchInput');
const tableContainer = document.getElementById('tableContainer');
const loading = document.getElementById('loading');
const message = document.getElementById('message');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const itemForm = document.getElementById('itemForm');
const closeModalBtn = document.getElementById('closeModal');

// Initialize
window.onload = async () => {
    if (Storage.getRole() !== 'admin') {
        location.href = 'index.html';
        return;
    }

    adminName.textContent = Storage.getUsername();
    loadSection(currentSection);
    setupEventListeners();
};

// Event Listeners
function setupEventListeners() {
    // Logout
    logoutBtn.addEventListener('click', () => {
        Storage.clear();
        location.href = 'index.html';
    });

    // Sidebar menu
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            currentSection = item.dataset.section;
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
            loadSection(currentSection);
        });
    });

    // Add button
    addBtn.addEventListener('click', () => openForm());

    // Search
    searchInput.addEventListener('input', (e) => {
        filterData(e.target.value);
    });

    // Modal
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Form submission
    itemForm.addEventListener('submit', handleFormSubmit);
}

// Load Section
async function loadSection(section) {
    showLoading();
    hideMessage();

    const titles = {
        movies: 'Movies',
        series: 'Series',
        users: 'Users'
    };
    sectionTitle.textContent = titles[section];

    try {
        if (section === 'movies') {
            allData = await api('/films');
        } else if (section === 'series') {
            allData = await api('/series');
        } else if (section === 'users') {
            allData = await api('/admin/users');
        }

        renderTable(allData);
    } catch (err) {
        showMessage('Error loading data', 'error');
    }

    hideLoading();
}

// Render Table
function renderTable(data) {
    if (data.length === 0) {
        tableContainer.innerHTML = '<p style="text-align:center;padding:2rem;color:#7f8c8d;">No data found.</p>';
        return;
    }

    let tableHTML = '<table>';

    if (currentSection === 'movies') {
        tableHTML += `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>IMDb</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(movie => `
                    <tr>
                        <td>${movie.id}</td>
                        <td>${movie.name}</td>
                        <td>${movie.genre}</td>
                        <td>⭐ ${movie.imdb_rating}</td>
                        <td>
                            <button class="btn btn-edit" onclick="editItem(${movie.id})">Edit</button>
                            <button class="btn btn-delete" onclick="deleteItem(${movie.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    } else if (currentSection === 'series') {
        tableHTML += `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>IMDb</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(series => `
                    <tr>
                        <td>${series.id}</td>
                        <td>${series.name}</td>
                        <td>${series.genre}</td>
                        <td>⭐ ${series.imdb_rating}</td>
                        <td>
                            <button class="btn btn-edit" onclick="editItem(${series.id})">Edit</button>
                            <button class="btn btn-delete" onclick="deleteItem(${series.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    } else if (currentSection === 'users') {
        tableHTML += `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>
                            <select id="role-${user.id}" onchange="changeRole(${user.id})">
                                <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                            </select>
                        </td>
                        <td>
                            <button class="btn btn-delete" onclick="deleteItem(${user.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    }

    tableHTML += '</table>';
    tableContainer.innerHTML = tableHTML;
}

// Filter Data
function filterData(query) {
    query = query.toLowerCase();
    const filtered = allData.filter(item => {
        if (currentSection === 'movies' || currentSection === 'series') {
            return item.name.toLowerCase().includes(query) || 
                   item.genre.toLowerCase().includes(query);
        } else if (currentSection === 'users') {
            return item.username.toLowerCase().includes(query) || 
                   item.email.toLowerCase().includes(query);
        }
    });
    renderTable(filtered);
}

// Open Form
async function openForm(itemId = null) {
    currentEditId = itemId;
    itemForm.innerHTML = '';

    if (itemId) {
        modalTitle.textContent = `Edit ${currentSection.slice(0, -1)}`;
        const item = allData.find(d => d.id === itemId);
        populateForm(item);
    } else {
        modalTitle.textContent = `Add ${currentSection.slice(0, -1)}`;
        generateForm();
    }

    modal.classList.remove('hidden');
}

// Close Form
function closeModal() {
    modal.classList.add('hidden');
    itemForm.reset();
    currentEditId = null;
}

// Generate Form
function generateForm(item = null) {
    let fields = [];

    if (currentSection === 'movies') {
        fields = [
            { name: 'name', label: 'Name', type: 'text', value: item?.name || '' },
            { name: 'director', label: 'Director', type: 'text', value: item?.director || '' },
            { name: 'genre', label: 'Genre', type: 'text', value: item?.genre || '' },
            { name: 'country', label: 'Country', type: 'text', value: item?.country || '' },
            { name: 'language', label: 'Language', type: 'text', value: item?.language || '' },
            { name: 'runtime', label: 'Runtime', type: 'number', value: item?.runtime || '' },
            { name: 'release_year', label: 'Release Year', type: 'number', value: item?.release_year || '' },
            { name: 'imdb_rating', label: 'IMDb Rating', type: 'text', value: item?.imdb_rating || '' },
            { name: 'poster', label: 'Poster', type: 'text', value: item?.poster || '' },
            { name: 'plot', label: 'Description', type: 'textarea', value: item?.plot || '' }
        ];
    } else if (currentSection === 'series') {
        fields = [
            { name: 'name', label: 'Name', type: 'text', value: item?.name || '' },
            { name: 'director', label: 'Director', type: 'text', value: item?.director || '' },
            { name: 'genre', label: 'Genre', type: 'text', value: item?.genre || '' },
            { name: 'country', label: 'Country', type: 'text', value: item?.country || '' },
            { name: 'language', label: 'Language', type: 'text', value: item?.language || '' },
            { name: 'release_year', label: 'Release Year', type: 'number', value: item?.release_year || '' },
            { name: 'end_year', label: 'End Year', type: 'number', value: item?.end_year || '' },
            { name: 'imdb_rating', label: 'IMDb Rating', type: 'text', value: item?.imdb_rating || '' },
            { name: 'poster', label: 'Poster', type: 'text', value: item?.poster || '' },
            { name: 'plot', label: 'Description', type: 'textarea', value: item?.plot || '' }
        ];
    }

    fields.forEach(field => {
        const inputHTML = field.type === 'textarea'
            ? `<textarea name="${field.name}" id="${field.name}" placeholder="${field.label}">${field.value}</textarea>`
            : `<input type="${field.type}" name="${field.name}" id="${field.name}" placeholder="${field.label}" value="${field.value}">`;
        itemForm.innerHTML += inputHTML;
    });

    itemForm.innerHTML += `
        <div class="form-actions">
            <button type="button" class="btn btn-cancel" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
        </div>
    `;
}

// Populate Form (same as generate but with values)
function populateForm(item) {
    generateForm(item);
}

// Handle Form Submit
async function handleFormSubmit(e) {
    e.preventDefault();
    showLoading();

    const formData = new FormData(itemForm);
    const data = Object.fromEntries(formData.entries());

    try {
        if (currentSection === 'movies') {
            if (currentEditId) {
                await api(`/films/${currentEditId}`, 'PUT', data);
            } else {
                await api('/films', 'POST', data);
            }
        } else if (currentSection === 'series') {
            if (currentEditId) {
                await api(`/series/${currentEditId}`, 'PUT', data);
            } else {
                await api('/series', 'POST', data);
            }
        }

        showMessage(`${currentEditId ? 'Updated' : 'Added'} successfully!`, 'success');
        closeModal();
        loadSection(currentSection);
    } catch (err) {
        showMessage('Error saving data', 'error');
    }

    hideLoading();
}

// Edit Item
async function editItem(id) {
    openForm(id);
}

// Delete Item
async function deleteItem(id) {
    if (!confirm(`Are you sure you want to delete this ${currentSection.slice(0, -1)}?`)) {
        return;
    }

    showLoading();

    try {
        if (currentSection === 'movies') {
            await api(`/films/${id}`, 'DELETE');
        } else if (currentSection === 'series') {
            await api(`/series/${id}`, 'DELETE');
        } else if (currentSection === 'users') {
            await api(`/admin/users/${id}`, 'DELETE');
        }

        showMessage('Deleted successfully!', 'success');
        loadSection(currentSection);
    } catch (err) {
        showMessage('Error deleting item', 'error');
    }

    hideLoading();
}

// Change User Role
async function changeRole(id) {
    const newRole = document.getElementById(`role-${id}`).value;
    showLoading();

    try {
        await api(`/admin/users/${id}/role`, 'PUT', { role: newRole });
        showMessage('Role updated successfully!', 'success');
    } catch (err) {
        showMessage('Error updating role', 'error');
        loadSection(currentSection); // Reload to reset the select
    }

    hideLoading();
}

// Show Loading
function showLoading() {
    loading.classList.remove('hidden');
}

// Hide Loading
function hideLoading() {
    loading.classList.add('hidden');
}

// Show Message
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
    setTimeout(() => hideMessage(), 3000);
}

// Hide Message
function hideMessage() {
    message.classList.add('hidden');
}