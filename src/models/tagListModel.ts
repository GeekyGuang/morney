const localStorageName = 'tags';

type tags = {
  id: string;
  name: string;
}

type tagListModel = {
  data: tags[];
  fetch: () => tags[];
  save: () => void;  // void代表不返回
  create: (name: string) => "success" | "duplicated";
  update: (id: string,name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
}

const tagListModel: tagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as tags[];
    return this.data
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
  update(id, name){
    const idList = this.data.map(item => item.id);
    if(idList.indexOf(id) >= 0) {
       const tag = this.data.filter(item => item.id === id)[0];
       tag.name = name;
       this.save();
       return 'success'
    }else {
      return 'not found'
    }
  },
  create(name) {
    const names = this.data.map(item => item.name)
    if(names.indexOf(name)>= 0) return "duplicated";
    this.data.push({id: name, name: name});
    this.save();
    return "success";
  },
  remove(id: string) {
    let index = -1;
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i].id === id){
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  }
};

export default tagListModel;