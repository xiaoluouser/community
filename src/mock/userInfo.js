import Mock from "mockjs";

const Random = Mock.Random;

//随机生成一个验证码


function getCode() {
    let correctCode = {
        statusCode: 0,
        code: Random.integer(100000, 999999),
    }
    return correctCode;
}

Mock.mock('/mock/userInfo', getCode);