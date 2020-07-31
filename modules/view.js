class View {
    constructor(api){
      this.app = document.getElementById('app');
      this.api = api;
      
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
  
      this.loadMoreBtn = this.createElement('button', 'btn');
      this.loadMoreBtn.textContent = "Загрузить ещё";
      this.loadMoreBtn.style.display = 'none';
      this.userWrapper.append(this.loadMoreBtn);
      
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
        userElement.addEventListener('click', () => this.showUserData(userData.login));
        userElement.innerHTML = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}">
                                 <span class="user-prev-name">${userData}</span>`;
      this.userList.append(userElement);
    }

    showUserData(userData){
      const userEL = this.createElement('div', 'user');
      const data = this.api.loadUserData(userData.login)
      .then(res => {
        const [following, followers, repos] = res;
        const followingList = this.createDatList(following, 'Following');

        userEL.innerHTML = `<img src="${userData.avatar_url}" alt="${userData.login}">`;
      })
    }

    createDatList(list, title){
      const block = this.createElement('div', 'user-block');
      const titleTag = this.createElement('h3', 'user-block-title');
      const listTage = this.createElement('li', 'user-list');
      titleTag.text = title;

      block.append(titleTag);
      return block.innerHTML;
    }

    toggleLoadMoreBtn(show){
      this.loadMoreBtn.style.display = show ? 'block' : 'none';
    }

    setCounterMessage(message){
      this.searchCounter.textContent = message;
    }
  }