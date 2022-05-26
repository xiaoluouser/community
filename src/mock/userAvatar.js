import Mock from "mockjs";

const Random = Mock.Random;

let randomData = Math.floor(Math.random() * 999) + 100;

function userAvatar() {
    return Random.image("200x200", `#${randomData}`, "#fff", "user");
}

Mock.mock('/mock/userAvatar', userAvatar);