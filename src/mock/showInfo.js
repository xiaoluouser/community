import Mock from "mockjs";

const Random = Mock.Random;
let contentArry = [];

function createContent() {
    for (let i = 0; i < 4; i++) {
        let newContent = {
            title:Random.ctitle(2),
            content:Random.cparagraph(1),
        }
        contentArry.push(newContent);
    }
    return contentArry;
}

Mock.mock('/mock/showInfo', createContent);