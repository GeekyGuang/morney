const localStorageName = 'records'
const model = {
  fetch(){
    return JSON.parse(window.localStorage.getItem(localStorageName) || '[]')
  },
  save(data){
    window.localStorage.setItem(localStorageName, JSON.stringify(data));
  }
}
export {model}