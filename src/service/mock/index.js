import Mock from 'mockjs'
import workflow from './workflowService'
const mockArr = [...workflow]

Mock.setup({
  timeout: 1000
})

mockArr.forEach(item => {
  Mock.mock(item.urlReg, ({ url, type, body }) => {
    return item.resultCbk(url, type, body)
  })
})
