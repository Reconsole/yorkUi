/**
 * 
 * @param {Function} func 
 * @param {Number} wait 
 */
export default function (func=() => {}, wait=300) {
  let timer, context, args, previous = 0
  let later = function () {
    timer = null
    previous = +new Date()
    func.apply(context)
  }
  return function () {
    let now = +new Date()
    context = this
    args = arguments
    let remaining = wait - ( now - previous )
    if(remaining <= 0 || remaining > wait) {
      if(timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      func.apply(context, args)
    } else if (!timer) {
      timer = setTimeout(later, remaining)
    }
  }
}
