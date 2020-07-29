const USER_PER_PAGE = 20;

class Search{
    setCurrentPage(pageNumber){
      this.currentPage = pageNumber;
    }
      constructor(view){
          this.view = view;
          this.view.searchInput.addEventListener('keyup',this.loadUsers.bind(this));
          this.view.loadMore.addEventListener('click',this.loadUsers.bind(this));
          this.currentPage = 1;
      }
  
      async loadUsers(){
        const searcValue = this.view.searchInput.value;
        if(searcValue)
        {
        return await fetch(`https://api.github.com/search/repositories?q=${searcValue}&per_page=${USER_PER_PAGE}&page=${this.currentPage}`)
        .then((res) => {
            if(res.ok){
              this.setCurrentPage(this.currentPage +1);
                res.json().then(res => {
                    res.items.forEach(user => this.view.createUser(user))
                })
            }
            else{
  
            }
        })
      }
      else{
      this.clearUsers();
      }
    }

      clearUsers(){
        this.view.userList.innerHTML = '';
      }
  }