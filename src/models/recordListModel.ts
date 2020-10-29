const localStorageName = 'records';
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as RecordItem[];
    return this.data;
    },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
  clone(data: RecordItem[] | RecordItem){
    return JSON.parse(JSON.stringify(data))
  }
};
export default recordListModel;