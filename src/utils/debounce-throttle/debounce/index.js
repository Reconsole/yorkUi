/**
 * 
 * @param {Function} func 
 * @param {Number} wait 
 * @param {Boolean} immediate 
 */
export default function (func = () => {}, wait = 300, immediate = false) {
  let context = null
  let args = null
  let timer = null
  return function () {
    context = this
    args = arguments
    clearTimeout(timer)
    if(immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if(callNow) func.apply(context , args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}