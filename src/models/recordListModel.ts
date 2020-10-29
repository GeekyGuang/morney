import clone from '@/lib/clone';

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
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createTime = new Date();
    this.data.push(record2);
  }
};
export default recordListModel;