export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw Error('className should not contain space')
  if (el.classList) {
    return el.classList.contains(cls)
  }
}
export function addClass (el, cls) {
  el.classList.add(cls)
}
export function removeClass (el, cls) {
  el.classList.remove(cls)
}
export function toggle (el, cls) {
  el.classList.toggle(cls)
}
