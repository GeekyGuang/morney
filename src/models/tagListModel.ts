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
  }
};

export default tagListModel;