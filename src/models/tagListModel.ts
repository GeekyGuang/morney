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
  create(name) {
    const names = this.data.map(item => item.name)
    if(names.indexOf(name)>= 0) return "duplicated";
    this.data.push({id: name, name: name});
    this.save();
    return "success";
  }
};

export default tagListModel;