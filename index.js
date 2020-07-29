class View {
  constructor(){
    this.app = document.getElementById('app');
    
    this.title = this.createElement('h1', 'title');
    this.title.textContent = 'Github Search Users';
    
    this.searchLine = this.createElement('div', 'search-line');
    this.searchInput = this.createElement('input', 'search-input');
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
  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }
  createUser(userData){
      const userElement = this.createElement('li','user-prev');
      userElement.innerHtml = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}">
                               <span class="user-prev-name">${userData.login}</span>`;
    this.userList.append(userElement);
  }
}
class Search{
    constructor(view){
        this.view = view;
        this.view.searchInput.addEventListener('keyup',this.searchUsers.bind(this));
    }

    async searchUsers(){
      return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchInput.value}`).then((res) => {
          if(res.ok){
              res.json().then(res => {
                  res.items.forEach(user => this.view.createUser(user))
              })
          }
          else{

          }
      })
    }
} 

const search = new Search(new View());