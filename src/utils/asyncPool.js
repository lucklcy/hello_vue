export const asyncPool = (tasks, concurrent = 2) => {
  const ret = []
  const executing = []
  let i = 0
  const len = tasks.length

  const enqueue = () => {
    if (i === len) return Promise.resolve()

    const curTask = tasks[i]
    i++
    ret.push(curTask)

    let r = Promise.resolve()

    if (concurrent <= tasks.length) {
      const e = Promise.resolve()
        .then(curTask)
        .then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= concurrent) {
        r = Promise.race(executing)
      }
    }

    return r.then(() => enqueue())
  }

  return enqueue().then(() => Promise.all(ret))
}
