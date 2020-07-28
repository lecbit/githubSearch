class Search{
    constructor(){
        this.app = document.getElementById('app');

        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Github Search Users';

        this.searchLine = this.createElement('div','search-line');
        this.searchInput = this.createElement('input','search-input');
        this.searchCounter = this.createElement('span', 'counter');
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchCounter);

        this.userWrapper = this.createElement('div', 'user-wrapper');
        this.userList = this.createElement('ul', 'users');
        this.userWrapper.append(this.userList);
        
        this.main = this.createElement('div', 'main');
        this.main.append(this.userWrapper);

        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.app.append(this.main);
    }

    createElement(elementTag, elementClass){
        const element = document.createElement(elementTag);
        if(elementClass){
            element.classList.add(elementClass);
        }
        return element;
    }
}

const search = new Search();