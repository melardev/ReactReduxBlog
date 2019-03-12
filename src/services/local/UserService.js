import {LocalStorageService} from "./base/LocalStorageService";
import {AxiosService} from "../remote/base/AxiosService";

const USER_KEY = 'user';


function hasRole(user, roleName) {
    if (!user)
        user = getUser();

    if (user == null)
        return false;

    return user.roles && user.roles.findIndex(role => role === roleName) !== -1;
}


function isAdmin(user) {
    return hasRole(user, 'ROLE_ADMIN');
}

function isNotAdmin() {
    return !isAdmin();
}

function isAuthor(user) {
    return hasRole(user, 'ROLE_AUTHOR')
}

function addUserExtrafields(user) {
    user.is_admin = isAdmin(user);
    user.is_author = isAuthor(user);
    return user;
}

function getUser() {
    try {
        return JSON.parse(LocalStorageService.get('user'));
    } catch (err) {
        return null;
    }
}

export const UserService = {

    isAuthenticated() {
        if (typeof window === "undefined")
            return false;
        const user = LocalStorageService.get(USER_KEY);
        return !!user;
    },

    authenticate(user) {
        if (typeof window !== 'undefined') {
            LocalStorageService.set(USER_KEY, JSON.stringify(user));
            addUserExtrafields(user);
        }
    },

    getToken() {
        const user = LocalStorageService.get('user');
        return user ? user.token : null;
    },

    saveUser(user) {
        LocalStorageService.set('user', JSON.stringify(user));
        addUserExtrafields(user);
        AxiosService.setUser(user);
    },


    clearSession() {
        LocalStorageService.clear('user');
    },

    isNotAuthenticated() {
        return !this.isAuthenticated();
    },

    initAndGetUser() {
        const user = getUser();
        if (user != null && user.username) {
            addUserExtrafields(user);
            return user;
        }
        return null;
    },
    getUser,
};
