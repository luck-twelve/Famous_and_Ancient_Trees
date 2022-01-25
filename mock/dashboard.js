import Mock from 'mockjs'

const NameList = []
const count = 100

for (let i = 0; i < count; i++) {
  NameList.push(
    Mock.mock({
      name: '@first'
    })
  )
}
NameList.push({ name: 'mock-Pan' })

export default [
  // username search
  {
    url: '/search/user',
    method: 'get',
    response: (config) => {
      const { name } = config.query
      const mockNameList = NameList.filter((item) => {
        const lowerCaseName = item.name.toLowerCase()
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
      })
      return {
        code: 20000,
        data: { items: mockNameList }
      }
    }
  }
]
