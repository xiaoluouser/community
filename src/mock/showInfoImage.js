import Mock from "mockjs";

const Random = Mock.Random;

function createImage() {
    let backgroundImage = [
        Random.image("424x300", "#DF8587","#fff","picture"),
        Random.image("280x160", "#E0BD9D","#fff","axios")
    ]
    return backgroundImage;
}
Mock.mock('/mock/showInfoImage', createImage);