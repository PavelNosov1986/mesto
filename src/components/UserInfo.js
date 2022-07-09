export class UserInfo {
    constructor({
        nameSelector,
        jobSelector
    }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatar = document.querySelector('.profile__avatar');
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        };
    }

    setUserInfo(title, job, avatar) {
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
        this._avatar.src = avatar;
    }
}