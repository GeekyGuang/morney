const localStorageName = 'tags';

type tagListModel = {
  data: string[];
  fetch: () => string[];
  save: () => void;  // void代表不返回
  create: (name: string) => "success" | "duplicated";

}

const tagListModel: tagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as string[];
    return this.data
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
  create(name) {
    if(this.data.indexOf(name)>= 0) return "duplicated";
    this.data.push(name);
    this.save();
    return "success";
  }
};

export default tagListModel;