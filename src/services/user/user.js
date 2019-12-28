export default class UserService {
  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('user'))
      ? JSON.parse(localStorage.getItem('user'))
      : {};
  }

  static hasCredentials() {
    let user = this.getUser();

    return user.hasOwnProperty('email') &&
            user.hasOwnProperty('password');
  }
}
