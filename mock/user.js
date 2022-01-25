import Mock from 'mockjs'

export default [
    {
        url: '/user/login',
        method: 'post',
        response: () => {
            return {
                code: 20000,
                data: {
                    email: null,
                    jwtToken: "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE3ODQ5MDQsImV4cCI6MTY0MjA0NDEwNCwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoiYWRtaW4ifQ.b_9PLJaPyCId2kzugnEk7KaxIP0R7bPcxyehzh8NpJs",
                    username: "admin"
                },
                flag: true,
                msg: "操作成功!"
            }
        }
    },
    {
        url: '/user/getUserInfo',
        method: 'post',
        response: () => {
            return {
                code: 20000,
                data: {
                    exp: 1642044104,
                    iat: 1641784904,
                    username: "admin"
                },
                flag: true,
                msg: "操作成功!"
            }
        }
    },
    {
        url: '/user/loginOut',
        method: 'post',
        response: () => {
            return {
                code: 20000,
                data: {
                    email: null,
                    jwtToken: "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE3ODQ5MDQsImV4cCI6MTY0MjA0NDEwNCwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoiYWRtaW4ifQ.b_9PLJaPyCId2kzugnEk7KaxIP0R7bPcxyehzh8NpJs",
                    username: "admin"
                },
                flag: true,
                msg: "操作成功!"
            }
        }
    }
]