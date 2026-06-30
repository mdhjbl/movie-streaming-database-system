const Storage = {

    saveToken(token) {
        localStorage.setItem("token", token);
    },

    getToken() {
        return localStorage.getItem("token");
    },

    removeToken() {
        localStorage.removeItem("token");
    },

    saveRole(role) {
        localStorage.setItem("role", role);
    },

    getRole() {
        return localStorage.getItem("role");
    },

    removeRole() {
        localStorage.removeItem("role");
    },

    saveUsername(username) {
        localStorage.setItem("username", username);
    },

    getUsername() {
        return localStorage.getItem("username");
    },

    removeUsername() {
        localStorage.removeItem("username");
    },

    clear() {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

    },

    isLoggedIn() {

        return !!localStorage.getItem("token");

    }

}